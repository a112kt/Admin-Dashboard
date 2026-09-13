'use client'
import { Box, SxProps, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface PropsType {
  children: React.ReactElement | React.ReactNode
  sx: SxProps
}

const Scrollbar = (props: PropsType) => {
  const { children, sx, ...other } = props
  const theme = useTheme()
  const lgdown = useMediaQuery(theme.breakpoints.down('lg'))

  if (lgdown) {
    return <Box sx={{ overflowX: 'auto' }}>{children}</Box>
  }

  return (
    <Box
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
}

export default Scrollbar
