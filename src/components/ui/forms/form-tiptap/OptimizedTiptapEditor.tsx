"use client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
  MenuButtonStrikethrough,
  MenuButtonOrderedList,
  MenuButtonBulletedList,
  MenuButtonBlockquote,
  MenuButtonCode,
  MenuButtonHorizontalRule,
  MenuButtonUndo,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
} from "mui-tiptap";
import { useEffect } from "react";
import "./Tiptap.css";

interface OptimizedTiptapEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  maxLines?: number;
}

const OptimizedTiptapEditor = ({ value, onChange, maxLines }: OptimizedTiptapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p>Type here...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  return (
    <RichTextEditorProvider editor={editor} >
      <RichTextField
        sx={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          ...(maxLines && {
            "& .MuiTiptap-FieldContainer-root": {
              minHeight: "unset",
              maxHeight: `${maxLines * 1.5}em`,
              overflowY: "auto",
            },
          }),
        }}
        controls={
          <MenuControlsContainer >
            {/* <MenuSelectHeading /> */}
            {/* <MenuDivider /> */}
            <MenuButtonBold />
            <MenuButtonItalic />

            <MenuButtonStrikethrough />
            <MenuDivider />

            <MenuButtonOrderedList />
            <MenuButtonBulletedList />
            <MenuDivider />
            <MenuButtonBlockquote />
            <MenuButtonHorizontalRule />
            <MenuDivider />
            <MenuButtonUndo />
            <MenuButtonRedo />
            <MenuDivider />

            <MenuButtonRemoveFormatting />
          </MenuControlsContainer>
        }
      />
    </RichTextEditorProvider>
  );
};
export default OptimizedTiptapEditor;
