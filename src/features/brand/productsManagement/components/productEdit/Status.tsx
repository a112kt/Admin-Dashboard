'use client'
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import { MenuItem, Avatar } from '@mui/material';
import { useGetStockStatus } from '../../hooks/productsHooks';
import CustomSelect from '@/components/ui/forms/theme-elements/CustomSelect';
import { StockStatusRes } from '../../types';

const statusColorMap: Record<string, string> = {
  Draft: 'blackColor.black60',
  Scheduled: 'warning.main',
  'Out of Stock': 'error.main',
  'In Stock': 'success.main',
};

interface StatusCardProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const StatusCard = ({ status, setStatus }: StatusCardProps) => {
  const { data: statusData, isSuccess } = useGetStockStatus();
  const [options, setOptions] = useState<{ value: string, color: string, label: string }[]>([])
  const [currentOption, setCurrentOption] = useState<{ value: string, color: string, label: string } | null>(null)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  useEffect(() => {
    if (isSuccess) {
      const opts = statusData?.data.map((s: StockStatusRes) => ({
        label: s.name,
        value: String(s.id),
        color: statusColorMap[s.name] || 'blackColor.black60',
      }))
      setOptions(opts);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (options.length > 0 && status) {
      const found = options.find((o) => o.value === status);
      if (found) setCurrentOption(found);
    }
  }, [options, status]);

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent='space-between'>
        <Typography variant='h5'>Status</Typography>
        <Avatar
          sx={{ backgroundColor: currentOption?.color || 'blackColor.black60', '& svg': { display: 'none' }, width: 15, height: 15 }}>
        </Avatar>
      </Box>
      <Grid container mt={3}>
        <Grid size={12}>
          <CustomSelect
            value={status}
            onChange={handleChange}
            fullWidth
          >
            {options.map((option: { value: string, color: string, label: string }) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
          <Typography variant="body2">Set the product status.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatusCard;
