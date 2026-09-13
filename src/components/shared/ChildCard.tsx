"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Theme,
  SxProps,
} from "@mui/material";
import CodeDialog from "./CodeDialog";

interface Props {
  children?: React.ReactNode;
  component?: React.ReactNode;
  filePath?: string;
  title?: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
}

const ChildCard = ({ filePath, title, sx, children, component }: Props) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    fetch(`/api/code?file=${filePath}`)
      .then((res) => res.text())
      .then((text) => setCode(text))
      .catch((err) => console.error("Error loading code:", err));
  }, [filePath]);
  return (
    <Card
      sx={{
        padding: 0,
        borderColor: (theme) => theme.palette.divider,
      }}
      variant="outlined"
    >
      {title && <CardHeader title={title} />}
      <Divider />
      <CardContent>
        <Box sx={{ ...sx }}> {children ?? component}</Box>
      </CardContent>

      {code && <CodeDialog>{code}</CodeDialog>}
    </Card>
  );
};

export default ChildCard;
