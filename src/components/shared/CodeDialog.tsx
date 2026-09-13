"use client";
import React from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Collapse,
  useTheme,
  Typography,
} from "@mui/material";
import { IconCode, IconCopy, IconCheck } from "@tabler/icons-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  children: string;
}

const CodeDialog = ({ children }: Props) => {
  const theme = useTheme();
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const toggleCode = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Collapse in={open}>
        <Box
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.paper
                : theme.palette.background.default,
            position: "relative",
            overflowX: "auto",
            px: 2,
            pt: 5,
            pb: 2,
            borderRadius: 0,
          }}
        >
          <Box sx={{ position: "absolute", top: 8, left: 16 }}>
            <Typography variant="h6" color="blackColor.black100">
              Sample Code
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 4,
              right: 8,
              display: "flex",
              gap: 1,
              borderRadius: 0,
            }}
          >
            <Tooltip title={open ? "Hide Code" : "Show Code"}>
              <IconButton onClick={toggleCode} size="small">
                <IconCode size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title={copied ? "Copied!" : "Copy Code"}>
              <IconButton onClick={handleCopy} size="small">
                {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
              </IconButton>
            </Tooltip>
          </Box>

          <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
            {children}
          </SyntaxHighlighter>
        </Box>
      </Collapse>

      {!open && (
        <Box
          p={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.paper
                : theme.palette.background.default,
            borderRadius: 0,
          }}
        >
          <Tooltip title={open ? "Hide Code" : "Show Code"}>
            <IconButton onClick={toggleCode}>
              <IconCode size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title={copied ? "Copied!" : "Copy Code"}>
            <IconButton onClick={handleCopy}>
              {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </>
  );
};

export default CodeDialog;
