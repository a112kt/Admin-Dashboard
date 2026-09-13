"use client";
import { Box, Typography } from "@mui/material";
import {
  RichTextEditor as MuiRichTextEditor,
  MenuControlsContainer,
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonStrikethrough,
  MenuButtonBulletedList,
  MenuButtonOrderedList,
  MenuButtonUndo,
  MenuButtonRedo,
  MenuButtonEditLink,
  MenuButtonTextColor,
  LinkBubbleMenu,
  LinkBubbleMenuHandler,
} from "mui-tiptap";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (html: string) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  label,
  value,
  onChange,
  error,
  helperText,
  placeholder = "Write something...",
  disabled = false,
}: RichTextEditorProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "primary.main",
          mb: 0.5,
          fontSize: "13px",
        }}
      >
        {label}
      </Typography>
      <MuiRichTextEditor
        extensions={[
          StarterKit,
          Link.configure({ openOnClick: false }),
          TextStyle,
          Color,
          LinkBubbleMenuHandler,
        ]}
        content={value || ""}
        editable={!disabled}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
        renderControls={() => (
          <MenuControlsContainer>
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonStrikethrough />
            <MenuButtonBulletedList />
            <MenuButtonOrderedList />
            <MenuButtonEditLink />
            <MenuButtonTextColor />
            <MenuButtonUndo />
            <MenuButtonRedo />
          </MenuControlsContainer>
        )}
        RichTextFieldProps={{
          variant: "outlined",
          disabled,
          sx: {
            opacity: disabled ? 0.6 : 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "error.main" : "#E5E7EB",
            },
          },
        }}
      >
        {() => <LinkBubbleMenu />}
      </MuiRichTextEditor>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block", fontWeight: 500 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
