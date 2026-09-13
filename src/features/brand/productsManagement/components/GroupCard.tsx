"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography, Tooltip, IconButton, Chip, Stack, Collapse } from "@mui/material";
import { IconX, IconPlus, IconGripVertical, IconChevronDown, IconChevronUp, IconPencil } from "@tabler/icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SpecRow from "./SpecRow";
import type { SpecItem } from "./InformationManager";

interface GroupCardProps {
  id: string;
  name: string;
  specs: SpecItem[];
  onUpdateSpec: (specId: string, field: keyof SpecItem, value: string | number) => void;
  onDeleteSpec: (specId: string) => void;
  onAddSpec: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const GroupCard = ({
  id,
  name,
  specs,
  onUpdateSpec,
  onDeleteSpec,
  onAddSpec,
  onEdit,
  onDelete,
}: GroupCardProps) => {
  const [expanded, setExpanded] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: "grey.50",
          borderBottom: expanded ? "1px solid" : "none",
          borderColor: "grey.200",
        }}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            cursor: "grab",
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          <IconGripVertical size={20} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {name}
          </Typography>
          <Chip
            label={`${specs.length} spec${specs.length !== 1 ? "s" : ""}`}
            size="small"
            variant="outlined"
            sx={{ height: 22, fontSize: 12 }}
          />
        </Box>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={onEdit}>
            <IconPencil size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" color="error" onClick={onDelete}>
            <IconX size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title={expanded ? "Collapse" : "Expand"}>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
          </IconButton>
        </Tooltip>
      </Stack>

      <Collapse in={expanded} timeout={200} easing="easeInOut">
        <Box sx={{ px: 2, py: 1.5 }}>
          <SortableContext items={specs.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {specs.map((spec) => (
              <SpecRow
                key={spec.id}
                id={spec.id}
                keyValue={spec.key}
                type={spec.type}
                value={spec.value}
                onKeyChange={(val) => onUpdateSpec(spec.id, "key", val)}
                onTypeChange={(val) => onUpdateSpec(spec.id, "type", val)}
                onValueChange={(val) => onUpdateSpec(spec.id, "value", val)}
                onDelete={() => onDeleteSpec(spec.id)}
              />
            ))}
          </SortableContext>
          {specs.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
              No specifications in this group
            </Typography>
          )}
          <Button
            variant="text"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={onAddSpec}
            sx={{ mt: 1 }}
          >
            Add Specification
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default GroupCard;
