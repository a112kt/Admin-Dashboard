"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import CodeDialog from "@/components/shared/CodeDialog";

type Props = {
  component: React.ReactNode;
  filePath: string;
  title?: string;
  subtitle?: string;
};

export default function CodePreview({
  component,
  filePath,
  title,
  subtitle,
}: Props) {
  const [code, setCode] = useState("");

  useEffect(() => {
    fetch(`/api/code?file=${filePath}`)
      .then((res) => res.text())
      .then((text) => setCode(text))
      .catch((err) => console.error("Error loading code:", err));
  }, [filePath]);

  return (
    <>
      {/* Header + Preview */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {(title || subtitle) && (
          <Box>
            {title && (
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        <Box>{component}</Box>
      </Box>
      <Box>
        <CodeDialog>{code}</CodeDialog>
      </Box> */}

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
          {(title || subtitle) && (
            <Box>
              {title && (
                <Typography variant="h6" fontWeight={600}>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}
        </CardContent>

        {code && <CodeDialog>{code}</CodeDialog>}
      </Card>
    </>
  );
}
