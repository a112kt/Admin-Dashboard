"use client";
import React, { useState, useImperativeHandle, forwardRef, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Typography, Stack } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import GroupCard from "./GroupCard";
import UngroupedSpecCard from "./UngroupedSpecCard";
import GroupModal from "./GroupModal";
import StandaloneSpecModal from "./StandaloneSpecModal";
import type { ProductInformationReq } from "../types";

export interface SpecItem {
  id: string;
  key: string;
  type: number;
  value: string;
}

export interface SpecGroup {
  id: string;
  name: string;
  specs: SpecItem[];
}

interface InformationManagerProps {
  initialInformations?: { key: string; value: string; type: string | number; group?: string | null; displayOrder: number }[];
}

const typeMap: Record<string, number> = { String: 1, Number: 2, Boolean: 3, Color: 4 };

let counter = 0;
const uid = (prefix: string) => `${prefix}-${Date.now()}-${counter++}`;

function flattenToReq(groups: SpecGroup[], ungrouped: SpecItem[]): ProductInformationReq[] {
  let order = 0;
  const result: ProductInformationReq[] = [];
  for (const group of groups) {
    for (const spec of group.specs) {
      result.push({ key: spec.key, value: spec.value, type: spec.type, group: group.name, displayOrder: order++ });
    }
  }
  for (const spec of ungrouped) {
    result.push({ key: spec.key, value: spec.value, type: spec.type, group: "", displayOrder: order++ });
  }
  return result;
}

const typeLabels = ["", "String", "Number", "Boolean", "Color"];

const InformationManager = forwardRef<{ getInformations: () => ProductInformationReq[] }, InformationManagerProps>(
  ({ initialInformations }, ref) => {
    const [groups, setGroups] = useState<SpecGroup[]>([]);
    const [ungroupedSpecs, setUngroupedSpecs] = useState<SpecItem[]>([]);
    const [activeItem, setActiveItem] = useState<{ type: "group"; data: SpecGroup } | { type: "spec"; data: SpecItem } | null>(null);

    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<{ index: number; name: string; specs: { key: string; type: number; value: string }[] } | null>(null);

    const [standaloneModalOpen, setStandaloneModalOpen] = useState(false);

    useEffect(() => {
      if (initialInformations && initialInformations.length > 0) {
        const grouped: Record<string, { key: string; value: string; type: number; displayOrder: number }[]> = {};
        const ungrouped: SpecItem[] = [];

        for (const item of initialInformations) {
          const type = typeof item.type === "string" ? typeMap[item.type] || 1 : item.type;
          const entry = { key: item.key, value: item.value, type, displayOrder: item.displayOrder };
          if (item.group) {
            if (!grouped[item.group]) grouped[item.group] = [];
            grouped[item.group].push(entry);
          } else {
            ungrouped.push({ id: uid("spec"), key: item.key, type, value: item.value });
          }
        }

        setGroups(
          Object.entries(grouped).map(([name, specs]) => ({
            id: uid("group"),
            name,
            specs: specs
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((s) => ({ id: uid("spec"), key: s.key, type: s.type, value: s.value })),
          }))
        );
        setUngroupedSpecs(ungrouped);
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getInformations: () => flattenToReq(groups, ungroupedSpecs),
      }),
      [groups, ungroupedSpecs]
    );

    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const findSpecContainer = useCallback(
      (id: string): { type: "group"; groupIdx: number } | { type: "ungrouped" } | null => {
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].specs.some((s) => s.id === id)) return { type: "group", groupIdx: i };
        }
        if (ungroupedSpecs.some((s) => s.id === id)) return { type: "ungrouped" };
        return null;
      },
      [groups, ungroupedSpecs]
    );

    const handleDragStart = useCallback(
      (event: DragStartEvent) => {
        const id = String(event.active.id);
        if (id.startsWith("group-")) {
          const g = groups.find((x) => x.id === id);
          if (g) setActiveItem({ type: "group", data: g });
        } else if (id.startsWith("spec-")) {
          for (const g of groups) {
            const s = g.specs.find((x) => x.id === id);
            if (s) { setActiveItem({ type: "spec", data: s }); return; }
          }
          const s = ungroupedSpecs.find((x) => x.id === id);
          if (s) setActiveItem({ type: "spec", data: s });
        }
      },
      [groups, ungroupedSpecs]
    );

    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        setActiveItem(null);
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeStr = String(active.id);
        const overStr = String(over.id);

        if (activeStr.startsWith("group-")) {
          setGroups((prev) => {
            const oldIdx = prev.findIndex((g) => g.id === activeStr);
            const newIdx = prev.findIndex((g) => g.id === overStr);
            if (oldIdx === -1 || newIdx === -1) return prev;
            return arrayMove(prev, oldIdx, newIdx);
          });
          return;
        }

        if (activeStr.startsWith("spec-")) {
          const activeContainer = findSpecContainer(activeStr);
          const overContainer = findSpecContainer(overStr);
          if (!activeContainer || !overContainer) return;

          if (activeContainer.type === "ungrouped" && overContainer.type === "ungrouped") {
            setUngroupedSpecs((prev) => {
              const oldIdx = prev.findIndex((s) => s.id === activeStr);
              const newIdx = prev.findIndex((s) => s.id === overStr);
              if (oldIdx === -1 || newIdx === -1) return prev;
              return arrayMove(prev, oldIdx, newIdx);
            });
          } else if (activeContainer.type === "group" && overContainer.type === "group") {
            setGroups((prev) => {
              const updated = [...prev];
              const gi = activeContainer.groupIdx;
              const activeIndex = updated[gi].specs.findIndex((s) => s.id === activeStr);
              const overIndex = updated[gi].specs.findIndex((s) => s.id === overStr);
              if (activeIndex === -1 || overIndex === -1) return prev;
              updated[gi] = {
                ...updated[gi],
                specs: arrayMove(updated[gi].specs, activeIndex, overIndex),
              };
              return updated;
            });
          }
        }
      },
      [findSpecContainer]
    );

    const addSpecToGroup = useCallback((groupIdx: number) => {
      setGroups((prev) => {
        const updated = [...prev];
        updated[groupIdx] = {
          ...updated[groupIdx],
          specs: [...updated[groupIdx].specs, { id: uid("spec"), key: "", type: 1, value: "" }],
        };
        return updated;
      });
    }, []);

    const updateSpecInGroup = useCallback(
      (groupIdx: number, specId: string, field: keyof SpecItem, value: string | number) => {
        setGroups((prev) => {
          const updated = [...prev];
          updated[groupIdx] = {
            ...updated[groupIdx],
            specs: updated[groupIdx].specs.map((s) => (s.id === specId ? { ...s, [field]: value } : s)),
          };
          return updated;
        });
      },
      []
    );

    const deleteSpecFromGroup = useCallback((groupIdx: number, specId: string) => {
      setGroups((prev) => {
        const updated = [...prev];
        updated[groupIdx] = {
          ...updated[groupIdx],
          specs: updated[groupIdx].specs.filter((s) => s.id !== specId),
        };
        return updated;
      });
    }, []);

    const deleteGroup = useCallback((index: number) => {
      setGroups((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const openEditGroup = useCallback((index: number) => {
      const g = groups[index];
      setEditingGroup({
        index,
        name: g.name,
        specs: g.specs.map((s) => ({ key: s.key, type: s.type, value: s.value })),
      });
      setGroupModalOpen(true);
    }, [groups]);

    const handleGroupSave = useCallback(
      (name: string, specs: { key: string; type: number; value: string }[]) => {
        if (editingGroup) {
          setGroups((prev) => {
            const updated = [...prev];
            updated[editingGroup.index] = {
              id: updated[editingGroup.index].id,
              name,
              specs: specs.map((s) => ({ id: uid("spec"), key: s.key, type: s.type, value: s.value })),
            };
            return updated;
          });
        } else {
          setGroups((prev) => [
            ...prev,
            { id: uid("group"), name, specs: specs.map((s) => ({ id: uid("spec"), key: s.key, type: s.type, value: s.value })) },
          ]);
        }
        setGroupModalOpen(false);
        setEditingGroup(null);
      },
      [editingGroup]
    );

    const addStandaloneSpec = useCallback((data: { key: string; type: number; value: string }) => {
      setUngroupedSpecs((prev) => [...prev, { id: uid("spec"), key: data.key, type: data.type, value: data.value }]);
    }, []);

    const updateStandaloneSpec = useCallback(
      (specId: string, field: keyof SpecItem, value: string | number) => {
        setUngroupedSpecs((prev) =>
          prev.map((s) => (s.id === specId ? { ...s, [field]: value } : s))
        );
      },
      []
    );

    const deleteStandaloneSpec = useCallback((specId: string) => {
      setUngroupedSpecs((prev) => prev.filter((s) => s.id !== specId));
    }, []);

    const hasData = groups.length > 0 || ungroupedSpecs.length > 0;

    return (
      <Box p={3}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Informations
        </Typography>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {groups.length > 0 && (
            <SortableContext items={groups.map((g) => g.id)} strategy={verticalListSortingStrategy}>
              <Stack spacing={1.5}>
                {groups.map((group, idx) => (
                  <GroupCard
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    specs={group.specs}
                    onUpdateSpec={(specId, field, val) => updateSpecInGroup(idx, specId, field, val)}
                    onDeleteSpec={(specId) => deleteSpecFromGroup(idx, specId)}
                    onAddSpec={() => addSpecToGroup(idx)}
                    onEdit={() => openEditGroup(idx)}
                    onDelete={() => deleteGroup(idx)}
                  />
                ))}
              </Stack>
            </SortableContext>
          )}

          {ungroupedSpecs.length > 0 && (
            <>
              {groups.length > 0 && (
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                  Standalone
                </Typography>
              )}
              <SortableContext items={ungroupedSpecs.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <Stack spacing={1}>
                  {ungroupedSpecs.map((spec) => (
                    <UngroupedSpecCard
                      key={spec.id}
                      id={spec.id}
                      keyValue={spec.key}
                      type={spec.type}
                      value={spec.value}
                      onKeyChange={(val) => updateStandaloneSpec(spec.id, "key", val)}
                      onTypeChange={(val) => updateStandaloneSpec(spec.id, "type", val)}
                      onValueChange={(val) => updateStandaloneSpec(spec.id, "value", val)}
                      onDelete={() => deleteStandaloneSpec(spec.id)}
                    />
                  ))}
                </Stack>
              </SortableContext>
            </>
          )}

          {!hasData && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
              No specifications added yet. Use the buttons below to add product information.
            </Typography>
          )}

          <DragOverlay>
            {activeItem ? (
              activeItem.type === "group" ? (
                <Box
                  sx={{
                    p: 2,
                    border: 2,
                    borderColor: "primary.main",
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    opacity: 0.95,
                    boxShadow: 6,
                    minWidth: 280,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {activeItem.data.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activeItem.data.specs.length} specification{activeItem.data.specs.length !== 1 ? "s" : ""}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 1.5,
                    border: 2,
                    borderColor: "primary.main",
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    opacity: 0.95,
                    boxShadow: 6,
                    minWidth: 200,
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    {activeItem.data.key || "Untitled"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {typeLabels[activeItem.data.type] || "String"}
                  </Typography>
                </Box>
              )
            ) : null}
          </DragOverlay>
        </DndContext>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<IconPlus size={18} />}
            onClick={() => {
              setEditingGroup(null);
              setGroupModalOpen(true);
            }}
          >
            Add Group
          </Button>
          <Button
            variant="text"
            startIcon={<IconPlus size={18} />}
            onClick={() => setStandaloneModalOpen(true)}
          >
            Add Information
          </Button>
        </Stack>

        <GroupModal
          open={groupModalOpen}
          initialName={editingGroup?.name}
          initialSpecs={editingGroup?.specs}
          onSave={handleGroupSave}
          onClose={() => {
            setGroupModalOpen(false);
            setEditingGroup(null);
          }}
        />

        <StandaloneSpecModal
          open={standaloneModalOpen}
          onSave={(data) => {
            addStandaloneSpec(data);
            setStandaloneModalOpen(false);
          }}
          onClose={() => setStandaloneModalOpen(false)}
        />
      </Box>
    );
  }
);

InformationManager.displayName = "InformationManager";

export default InformationManager;
