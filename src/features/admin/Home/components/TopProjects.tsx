'use client'


import BlankCard from '@/components/shared/BlankCard'
import { Box, Stack, Typography, useTheme, Chip, styled } from '@mui/material'
// table
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Image from 'next/image'


interface TopBrandItem {
  brandId: number;
  brandName: string;
  totalRevenue: number;
  totalOrders: number;
}

interface TopProjectsProps {
  topBrands?: TopBrandItem[];
}

const TopProjects = ({ topBrands }: TopProjectsProps) => {
  const theme = useTheme()

  const brands = topBrands || []

  const HeaderCell = styled(TableCell)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    p: 1,
    color: theme.palette.blackColor.black60
  }))

  return (
    <BlankCard>
      <Box p={3}>
        <Typography variant='h5'>Top Performing Brands</Typography>
        <Box mt={2.5}>
          <TableContainer>
            <Table sx={{ minWidth: 610, tableLayout: 'auto' }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <HeaderCell>Brand</HeaderCell>
                  <HeaderCell>Orders</HeaderCell>
                  <HeaderCell>Revenue</HeaderCell>
                  <HeaderCell>Performance</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.map((brand, index) => (
                  <TableRow key={brand.brandId} sx={{ 'td, th': { border: 0 }, 'td': { p: 1 } }} >
                    <TableCell component='th' scope='row'>
                      <Typography variant='body1' fontWeight={500}>
                        {brand.brandName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' fontWeight={500}>
                        {brand.totalOrders}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' fontWeight={500}>
                        EGP {brand.totalRevenue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={index === 0 ? 'Top' : index < 3 ? 'Growing' : 'Active'}
                        size='small'
                        sx={{
                          bgcolor: index === 0 ? theme.palette.success.light : index < 3 ? theme.palette.warning.light : theme.palette.primary.light,
                          color: index === 0 ? theme.palette.success.main : index < 3 ? theme.palette.warning.main : theme.palette.primary.main,
                          width: 'fit-content',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </BlankCard>
  )
}

export default TopProjects
