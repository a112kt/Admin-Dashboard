"use client"
import { Card } from '@mui/material';

import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { CustomizerContext } from '@/context/customizerContext';


type Props = {
  className?: string;
  children: React.ReactNode;
  sx?: any;
};

const BlankCard = ({ children, className, sx }: Props) => {

  const { isCardShadow } = useContext(CustomizerContext);
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{ 
        p: 0, 
        border: !isCardShadow ? `1px solid ${borderColor}` : 'none', 
        position: 'relative', 
        borderRadius: '24px',
        boxShadow: isCardShadow ? '0px 10px 30px rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isCardShadow ? '0px 15px 40px rgba(0, 0, 0, 0.08)' : 'none',
        },
        ...sx 
      }}
      className={className}
      elevation={isCardShadow ? 0 : 0}
      variant={!isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
