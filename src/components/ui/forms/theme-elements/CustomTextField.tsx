'use client'
import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';



const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider, // default
    },

    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main, // on focus
    },
    '&.Mui-disabled fieldset': {
      borderColor: theme.palette.divider, // disabled
    },
  },
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
}));
export default CustomTextField;
