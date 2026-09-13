'use client'
import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack, Typography } from '@mui/material';
import { MenuItem, Avatar } from '@mui/material';
import CustomSelect from '@/components/ui/forms/theme-elements/CustomSelect';
import { ProductContext } from '@/context/EcommerceContext';
import { CategoryRes } from '../../types';

const statusColorMap: Record<string, string> = {
    Draft: 'blackColor.black60',
    Scheduled: 'warning.main',
    Inactive: 'error.main',
    Active: 'success.main',
};

interface CategoryCardProps {
    categories: CategoryRes[];
    setCategoryId: React.Dispatch<React.SetStateAction<string>>;
    error?: string;
}

const CategoryCard = ({ categories, setCategoryId, error }: CategoryCardProps) => {
    const { products } = useContext(ProductContext);
    const [category, setCategory] = useState<CategoryRes | null>(null);

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
        image: category.imageUrl,
    }));

    const currentOption = categoryOptions.find((opt) => opt.value === category?.id);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const category = categories.find((cat) => cat.id === event.target.value as number);
        if (category) {
            setCategory(category);
            setCategoryId(category.id.toString());
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" alignItems="center" justifyContent='space-between'>
                <Typography variant='h5'>Category</Typography>
                {/* <Avatar
                    sx={{ backgroundColor: currentOption?.color || 'blackColor.black60', '& svg': { display: 'none' }, width: 15, height: 15 }}>
                </Avatar> */}
            </Box>
            <Grid container mt={3}>
                <Grid size={12}>
                    <CustomSelect
                        value={category?.id ?? ""}
                        onChange={handleChange}
                        fullWidth
                        displayEmpty
                    >
                        {!category && <MenuItem value="" disabled>Select Category</MenuItem>}
                        {categoryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
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
                    <Typography variant="body2">Set the product status.</Typography>
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
