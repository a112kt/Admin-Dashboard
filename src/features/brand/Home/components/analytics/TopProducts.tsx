"use client";

import { useTranslation } from 'react-i18next';
import { Icon } from "@iconify/react/dist/iconify.js";
import BlankCard from "@/components/shared/BlankCard";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
  Button
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { TopProduct } from "../../types";
import Link from "next/link";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";

const TopProducts = ({ topProducts }: { topProducts: TopProduct[] }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const products = topProducts || [];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BlankCard sx={{ height: "100%", p: 3 }}>
      <>
        <Box mb={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5" fontWeight={600}>
              {t('Top Products')}
            </Typography>
            <IconButton onClick={handleClick} size="small">
              <Icon icon={"solar:menu-dots-bold"} width={24} height={24} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>{t('View All Products')}</MenuItem>
            </Menu>
          </Stack>
        </Box>
        <Stack spacing={3}>
          {products.map((product, index) => (
            <Box key={product.productId}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(0,0,0,0.05)",
                      color: "text.primary",
                      fontWeight: 700,
                      fontSize: "14px",
                      borderRadius: "12px",
                    }}
                  >
                    {product.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.totalSold} {t('sold')} • EGP {product.revenue.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              {index < products.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            href="/products-management/products"
            endIcon={<ArrowForwardTwoToneIcon />}
            sx={{
              color: "black",
              width: "fit-content",
              mt: 1,
              borderRadius: "12px",
              textTransform: "none",
              px: 3,
            }}
          >
            {t('Show All Products')}
          </Button>
        </Stack>
      </>
    </BlankCard>
  );
};

export default TopProducts;
