'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack, Typography } from '@mui/material';
import { MenuItem, Avatar } from '@mui/material';
import CustomSelect from '@/components/ui/forms/theme-elements/CustomSelect';
import { CategoryRes } from '../../types';

interface CategoryCardProps {
    categories: CategoryRes[];
    categoryId: string;
    setCategoryId: React.Dispatch<React.SetStateAction<string>>;
    error?: string;
}

const CategoryCard = ({ categories, categoryId, setCategoryId, error }: CategoryCardProps) => {
    const [category, setCategory] = useState<CategoryRes | null>(() => {
        if (categoryId) {
            return categories.find((c) => c.id === Number(categoryId)) || null;
        }
        return categories[0] || null;
    });

    useEffect(() => {
        if (categories.length === 0) return;
        if (categoryId) {
            const cat = categories.find((c) => c.id === Number(categoryId));
            if (cat) setCategory(cat);
        }
    }, [categories, categoryId]);

    const categoryOptions = categories.map((cat) => ({
        label: cat.name,
        value: cat.id,
        image: cat.imageUrl,
    }));

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const cat = categories.find((c) => c.id === event.target.value as number);
        if (cat) {
            setCategory(cat);
            setCategoryId(cat.id.toString());
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" alignItems="center" justifyContent='space-between'>
                <Typography variant='h5'>Category</Typography>
            </Box>
            <Grid container mt={3}>
                <Grid size={12}>
                    <CustomSelect
                        value={category?.id}
                        onChange={handleChange}
                        fullWidth
                    >
                    
                        {categoryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value} >
                                <Stack direction="row" spacing={1}>
                                    <Avatar
                                        src={option.image}
                                        alt={option.label}
                                        sx={{ width: 20, height: 20 }}>
                                    </Avatar>
                                    <Typography variant="h6">{option.label}</Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </CustomSelect>
                    <Typography variant="body2">Set the product category.</Typography>
                    {error && (
                        <Typography variant="body2" color="error.main" mt={1}>
                            {error}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CategoryCard;
