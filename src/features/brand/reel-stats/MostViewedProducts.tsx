'use client'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import Image from 'next/image'
import type { MostViewedProduct } from './types'


interface MostViewedProductsProps {
  mostViewedProducts?: MostViewedProduct[] | null;
}

const MostViewedProducts = ({ mostViewedProducts }: MostViewedProductsProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const fallbackProducts: MostViewedProduct[] = [
    { productId: 0, name: t('No data yet'), imageUrl: null, views: 0 },
  ];

  const products = (mostViewedProducts && mostViewedProducts.length > 0)
    ? mostViewedProducts
    : fallbackProducts;

  const formatViews = (views: number): string => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}${t('M Views')}`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}${t('K Views')}`;
    return `${views} ${t('Views')}`;
  };

  return (
    <BlankCard sx={{ height: "100%" }}>
      <Box p={3}>
        <Typography variant='h5'>{t('Most Viewed Products')}</Typography>
        <Box mt={2.5}>
          {products.map((item, i) => (
            <Box key={i}>
              <Box py={1.5}>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}>

                  <Stack
                    direction={'row'} alignItems={'center'} gap={1.5}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '6px',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          onError={(e) => { (e.target as HTMLImageElement).src = '/images/dashboard/analytics/imagePlaceholder.avif'; }}
                          alt={item.name}
                          width={40}
                          height={40}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: theme.palette.grey[200],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="caption" color="textSecondary">{t('N/A')}</Typography>
                        </Box>
                      )}
                    </Box>
                    <Typography
                      variant='body1' fontWeight={500}
                    >
                      {item.name}
                    </Typography>
                  </Stack>
                  <Typography variant='body1' color={theme.palette.blackColor.black60}
                  >
                    {formatViews(item.views)}
                  </Typography>
                </Stack>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      </Box>
    </BlankCard>
  )
}

export default MostViewedProducts
