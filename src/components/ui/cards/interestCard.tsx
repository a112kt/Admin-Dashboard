import { Card, Typography, Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";

export default function InterestCard({ id, name, setSelectedInterests, selectedInterests }: { id: number, name: string, setSelectedInterests: any, selectedInterests: any }) {
    const isSelected = selectedInterests.includes(id);

    const handleToggle = () => {
        if (isSelected) {
            setSelectedInterests((prev: any) => prev.filter((item: any) => item !== id));
        } else {
            setSelectedInterests((prev: any) => [...prev, id]);
        }
    };

    return (
        <Card
            onClick={handleToggle}
            sx={{
                bgcolor: isSelected ? "secondary.main" : "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "fit-content",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                },
            }}
        >
            <Typography variant="h6" fontWeight={500} fontSize={16} color={isSelected ? "white" : "primary.main"} padding="10px">
                {name}
            </Typography>

        </Card>
    );
}
