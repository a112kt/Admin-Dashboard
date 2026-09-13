'use client'
import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { Box, Badge, Drawer, IconButton, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import emptyCart from "/public/images/products/empty-shopping-cart.svg";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';


const Cart = () => {
  const { t } = useTranslation();


  const [showDrawer, setShowDrawer] = useState(false);
  const handleDrawerClose = () => {
    setShowDrawer(false);
  };
  return (
    <Box>
      <IconButton
        size="small"
        color="inherit"
        onClick={() => setShowDrawer(true)}
        sx={{
          color: 'text.secondary',
          ...(showDrawer && {
            color: 'primary.main',
          }),
        }}
      >
        <Badge color="error" badgeContent='0'>
          <Icon icon="solar:cart-plus-line-duotone" width="23" height="23" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Cart Sidebar */}
      {/* ------------------------------------------- */}
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        slotProps={{
          paper: { sx: { maxWidth: '500px' } }
        }}
      >
        <Box display="flex" p={3} flexDirection='column'>
          <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Typography variant="h5" fontWeight={600}>
              {t('Shopping Cart')}
            </Typography>
            <Box>
              <IconButton
                color="inherit"
                onClick={handleDrawerClose}
              >
                <IconX size="1rem" />
              </IconButton>
            </Box>
          </Box>
          <Box mt={2} display="flex" alignItems="center" flexDirection='column'>
            <img src="/images/products/empty-shopping-cart.svg" alt="cart" width={200} height={200} />
            <Typography variant="h5" mb={2}>
              {t('Cart is Empty')}
            </Typography>
            <Button
              component={Link}
              href="/apps/ecommerce/shop"
              variant="contained"
            >
              {t('Go back to Shopping')}
            </Button>
          </Box>
        </Box>
      </Drawer >
    </Box >
  );
};

export default Cart;
