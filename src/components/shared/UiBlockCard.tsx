'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    useTheme,
} from '@mui/material';
import { IconBox } from '@tabler/icons-react';


interface UiBlockProps {

    img?: string;
    name?: string;

}

const UiBlockCard: React.FC<UiBlockProps> = ({
    img,
    name,

}) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                overflow: 'hidden',
                backgroundColor: '#EEF0EF',
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
                p: 0,
            }}
        >
            {/* Image container */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 240,
                    p: 2,

                }}
            >
                <Box
                    sx={{

                        m: 2,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',


                    }}
                >
                    {img && (
                        <img
                            src={img}
                            alt={name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: "contain"
                            }}

                        />
                    )}
                </Box>
            </Box>

            {/* Text content */}
            <Box
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    p: 2,
                    borderRadius: 0
                }}
            >
                <Typography variant="h5" color='blackColor.black100'>
                    {name}
                </Typography>
            </Box>
        </Card>
    );
};

export default UiBlockCard;
