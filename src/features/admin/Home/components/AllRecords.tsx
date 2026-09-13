'use client'

import { Box, Stack, Typography, useTheme, styled } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'




interface AllRecordsProps {
  totalUsers?: number;
  totalBrands?: number;
  pendingRequests?: number;
  totalOrders?: number;
  totalReels?: number;
}

const AllRecords = ({ totalUsers, totalBrands, pendingRequests, totalOrders, totalReels }: AllRecordsProps) => {

  const StyledTypographyLink = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    cursor: 'pointer',
    textDecoration: 'none',

  }));

  const theme = useTheme()

  return (
    <BlankCard>
      <Box p={3}>
        <Typography variant='h5'>Total Assets</Typography>
        <Box mt={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="stretch" gap={2}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box
                p={2}
                sx={{ backgroundColor: theme.palette.success.light, mb: 2, flex: 1 }}>
                <Stack gap={{ xs: 1.5, sm: 8 }}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>

                    <Link href="/apps/contacts" >
                      <StyledTypographyLink variant='body1'>
                        Total Users
                      </StyledTypographyLink>
                    </Link>
                    <Box >
                      <Icon
                        icon={'solar:users-group-rounded-line-duotone'}
                        width={24}
                        height={24}
                        color={theme.palette.success.main}
                      />
                    </Box>
                  </Stack>
                    <Typography variant='h5'>{totalUsers?.toLocaleString() ?? "—"}</Typography>
                </Stack>
              </Box>
              <Box
                p={2}
                sx={{ backgroundColor: theme.palette.primary.light, flex: 1 }}>
                <Stack gap={{ xs: 1.5, sm: 8 }}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>

                      <StyledTypographyLink variant='body1'>
                        Pending Requests
                      </StyledTypographyLink>
                    <Box >
                      <Icon
                        icon={'solar:case-minimalistic-line-duotone'}
                        width={24}
                        height={24}
                        color={theme.palette.primary.main}
                      />
                    </Box>
                  </Stack>
                    <Typography variant='h5'>{pendingRequests?.toLocaleString() ?? "—"}</Typography>
                </Stack>
              </Box>
            </Box>
            <Box sx={{
              width: '100%', display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 2
            }}>
              <Box
                p={2}
                sx={{ backgroundColor: theme.palette.purple.light }}>
                <Stack gap={1.5}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>

                    <Link href="/admin/requests" >
                      <StyledTypographyLink variant='body1'>
                        Total Brands
                      </StyledTypographyLink>
                    </Link>
                    <Box >
                      <Icon
                        icon={'solar:users-group-rounded-line-duotone'}
                        width={24}
                        height={24}
                        color={theme.palette.purple.main}
                      />
                    </Box>
                  </Stack>
                  <Typography variant='h5'>{totalBrands?.toLocaleString() ?? "—"}</Typography>
                </Stack>
              </Box>
              <Box
                p={2}
                sx={{ backgroundColor: theme.palette.warning.light }}>
                <Stack gap={1.5}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>

                    <Link href="/admin/orders" >
                      <StyledTypographyLink variant='body1'>
                        Total Orders
                      </StyledTypographyLink>
                    </Link>
                    <Box>
                      <Icon
                        icon={'solar:bill-list-line-duotone'}
                        width={24}
                        height={24}
                        color={theme.palette.warning.main}
                      />
                    </Box>
                  </Stack>
                  <Typography variant='h5'>{totalOrders?.toLocaleString() ?? "—"}</Typography>
                </Stack>
              </Box>
              <Box
                p={2}
                sx={{ backgroundColor: theme.palette.error.light }}>
                <Stack gap={1.5}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>

                    <StyledTypographyLink variant='body1'>
                      Total Reels
                    </StyledTypographyLink>
                    <Box >
                      <Icon
                        icon={'solar:video-library-line-duotone'}
                        width={24}
                        height={24}
                        color={theme.palette.error.main}
                      />
                    </Box>
                  </Stack>
                  <Typography variant='h5'>{totalReels?.toLocaleString() ?? "—"}</Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box >
    </BlankCard >
  )
}

export default AllRecords

