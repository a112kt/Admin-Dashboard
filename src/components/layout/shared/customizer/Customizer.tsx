import { FC, useState, useContext } from 'react'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled, SxProps, Theme, useTheme } from '@mui/material/styles'
import { CustomizerContext } from '@/context/customizerContext'
import Box, { BoxProps } from '@mui/material/Box'
import { IconX, IconSettings, IconCheck } from '@tabler/icons-react'
import Scrollbar from '@/components/ui/custom-scroll/Scrollbar'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslation } from 'react-i18next'

const SidebarWidth = '320px'
interface colors {
  id: number
  bgColor: string
  disp?: string
}


const Customizer: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showDrawer, setShowDrawer] = useState(false)
  const {
    activeDir,
    setActiveDir,
    activeMode,
    setActiveMode,
    isCollapse,
    setIsCollapse,
    activeTheme,
    activeLayout,
    setActiveLayout,
    isLayout,
    isCardShadow,
    setIsCardShadow,
    setIsLayout,
    isBorderRadius,
    setIsBorderRadius,
    setActiveTheme,
  } = useContext(CustomizerContext)



  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: '20px',
    cursor: 'pointer',
    justifyContent: 'center',
    display: 'flex',
    transition: '0.1s ease-in',
    border: '1px solid rgba(145, 158, 171, 0.12)',
    '&:hover': {
      transform: 'scale(1.05)',
    },


  }))



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addAttributeToBody = (cvalue: any) => {
    document.body.setAttribute('data-color-theme', cvalue)
  }


  const thColors: colors[] = [
    {
      id: 1,
      bgColor: '#C2FD75',
      disp: 'GREEN_THEME',
    },
    {
      id: 2,
      bgColor: '#FF9F1C',
      disp: 'YELLOW_THEME',
    },
    {
      id: 3,
      bgColor: '#C2B4F8',
      disp: 'VIOLET_THEME',
    },
    {
      id: 4,
      bgColor: '#6EE7FF',
      disp: 'BLUE_THEME',
    },
    {
      id: 5,
      bgColor: '#73FBD3',
      disp: 'TEAl_THEME',
    },
    {
      id: 6,
      bgColor: '#b9cbff',
      disp: 'LAVENDER_THEME',
    },

  ]

  //  * Returns style properties for a setting box based on whether it is active
  //  * and what the current theme mode is (light or dark).
  //  *
  //  * - In light mode:
  //  *    - Active box: light background, primary text/icon color
  //  *    - Inactive box: transparent background, default colors
  //  * - In dark mode:
  //  *    - Active box: primary background, white text/icon color
  //  *    - Inactive box: transparent background, default colors

  const getBoxStyle = (isActive: boolean): SxProps<Theme> => {
    return {
      backgroundColor: isActive
        ? activeMode === 'light'
          ? 'primary.light'
          : 'primary.main'
        : 'transparent',
      color: isActive
        ? activeMode === 'light'
          ? 'primary.main'
          : 'secondary.main'
        : 'inherit',
    }
  }

  return (
    (<div>
      {/* ------------------------------------------- */}
      {/* --Floating Button to open customizer ------ */}
      {/* ------------------------------------------- */}
      <Tooltip title={t('Settings')}>
        <Fab
          color='primary'
          aria-label='settings'
          sx={{
            position: 'fixed', right: '25px', bottom: '15px',

          }}
          onClick={() => setShowDrawer(true)}>
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>
      <Drawer
        anchor='right'
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              width: SidebarWidth,
            },
          }
        }}>
        {/* ------------------------------------------- */}
        {/* ------------ Customizer Sidebar ------------- */}
        {/* ------------------------------------------- */}
        <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
          <Box
            p={2}
            display='flex'
            justifyContent={'space-between'}
            alignItems='center'>
            <Typography variant='h4'>{t('Settings')}</Typography>

            <IconButton color='inherit' onClick={() => setShowDrawer(false)}>
              <IconX size='1rem' />
            </IconButton>
          </Box>
          <Divider />
          <Box p={3}>
            {/* ------------------------------------------- */}
            {/* ------------ Dark light theme setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant='h6' gutterBottom>
              {t('Theme Option')}
            </Typography>
            <Stack direction={'row'} gap={2} my={2}>
              <StyledBox
                onClick={() => setActiveMode('light')}
                sx={getBoxStyle(activeMode === 'light')}
                display='flex'
                gap={1}
              >
                <Icon
                  icon="solar:sun-bold-duotone"
                  color='inherit'
                  width="20"
                />
                {t('Light')}
              </StyledBox>
              <StyledBox
                onClick={() => setActiveMode('dark')}
                sx={getBoxStyle(activeMode === 'dark')}
                display='flex'
                gap={1}>
                <Icon
                  icon="solar:moon-bold-duotone"
                  width="20"
                  color='inherit'
                />
                {t('Dark')}
              </StyledBox>
            </Stack>

            <Box pt={3} />
            {/* ------------------------------------------- */}
            {/* ------------ RTL theme setting -------------*/}
            {/* ------------------------------------------- */}
            <Typography variant='h6' gutterBottom>
              {t('Theme Direction')}
            </Typography>
            <Stack direction={'row'} gap={2} my={2}>
              <StyledBox
                onClick={() => setActiveDir('ltr')}
                display='flex'
                gap={1}
                sx={getBoxStyle(activeDir === 'ltr')}
              >
                <Icon
                  icon="solar:align-left-line-duotone"
                  width="20"
                  color='inherit'
                />{' '}
                {t('LTR')}
              </StyledBox>
              <StyledBox
                onClick={() => setActiveDir('rtl')}
                display='flex'
                gap={1}
                sx={getBoxStyle(activeDir === 'rtl')}
              >
                <Icon
                  icon="solar:align-right-line-duotone"
                  width="20"
                  color='inherit'
                />{' '}
                {t('RTL')}
              </StyledBox>
            </Stack>

            <Box pt={3} />
            {/* ------------------------------------------- */}
            {/* ------------ Theme Color setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant='h6' gutterBottom>
              {t('Theme Colors')}
            </Typography>
            <Grid container spacing={2}>
              {thColors.map((thcolor) => (
                <Grid key={thcolor.id} size={4}>
                  <StyledBox onClick={() => addAttributeToBody(thcolor.disp)}>
                    <Tooltip title={`${thcolor.disp}`} placement='top'>
                      <Box
                        sx={{
                          backgroundColor: thcolor.bgColor,
                          width: '25px',
                          height: '25px',
                          borderRadius: '60px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          display: 'flex',
                          color: 'whiteColor.white100',
                        }}
                        aria-label={`${thcolor.bgColor}`}
                        onClick={() => setActiveTheme(thcolor.disp)}
                      >
                        {activeTheme === thcolor.disp ? (
                          <IconCheck width={18} color='black' />
                        ) : (
                          ''
                        )}
                      </Box>
                    </Tooltip>
                  </StyledBox>
                </Grid>
              ))}
            </Grid>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Layout Horizontal / Vertical ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant='h6' gutterBottom>
              {t('Layout Type')}
            </Typography>
            <Stack direction={'row'} gap={2} my={2}>
              <StyledBox
                onClick={() => setActiveLayout('vertical')}
                sx={getBoxStyle(activeLayout === 'vertical')}
                display='flex'
                gap={1}>
                <Icon
                  icon="solar:slider-vertical-line-duotone"
                  width="20"
                  color='inherit'
                />
                {t('Vertical')}
              </StyledBox>
              <StyledBox
                onClick={() => setActiveLayout('horizontal')}
                sx={getBoxStyle(activeLayout === 'horizontal')}

                display='flex'
                gap={1}>
                <Icon
                  icon="solar:slider-horizontal-line-duotone"
                  width="20"
                  color='inherit'
                />
                {t('Horizontal')}
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Layout Boxed / Full ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant='h6' gutterBottom>
              {t('Container Option')}
            </Typography>
            <Stack direction={'row'} gap={2} my={2}>
              <StyledBox
                onClick={() => setIsLayout('boxed')}
                sx={getBoxStyle(isLayout === 'boxed')}
                display='flex'
                gap={1}>
                <Icon
                  icon="solar:quit-full-screen-square-line-duotone"
                  width="20"
                  color='inherit'
                />
                {t('Boxed')}
              </StyledBox>
              <StyledBox
                onClick={() => setIsLayout('full')}
                sx={getBoxStyle(isLayout === 'full')}
                display='flex'
                gap={1}>
                <Icon
                  icon="solar:full-screen-square-line-duotone"
                  width="20"
                  color='inherit'
                />
                {t('Full')}
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Sidebar Color setting ------------- */}
            {/* ------------------------------------------- */}

            {/* ------------------------------------------- */}
            {/* ------------ Theme Color setting ------------- */}
            {/* ------------------------------------------- */}
            {activeLayout === 'horizontal' ? (
              ''
            ) : (
              <>
                <Typography variant='h6' gutterBottom>
                  {t('Sidebar Type')}
                </Typography>
                <Stack direction={'row'} gap={2} my={2}>
                  <StyledBox
                    onClick={() => {
                      setIsCollapse('full-sidebar')
                    }}
                    sx={getBoxStyle(isCollapse === 'full-sidebar')}

                    display='flex'
                    gap={1}>
                    <Icon
                      icon="solar:mirror-left-line-duotone"
                      width="20"
                      color='inherit'
                    />
                    {t('Full')}
                  </StyledBox>
                  <StyledBox
                    onClick={() => setIsCollapse('mini-sidebar')}
                    sx={getBoxStyle(isCollapse === 'mini-sidebar')}
                    display='flex'
                    gap={1}>
                    <Icon
                      icon="solar:mirror-right-line-duotone"
                      width="20"
                      color='inherit'
                    />
                    {t('mini')}
                  </StyledBox>
                </Stack>
              </>
            )}
            <Box pt={4} />
            <Typography variant='h6' gutterBottom>
              {t('Card With')}
            </Typography>
            <Stack direction={'row'} gap={2} my={2}>
              <StyledBox
                onClick={() => setIsCardShadow(false)}
                sx={getBoxStyle(isCardShadow === false)}
                display='flex'
                gap={1}>

                <Icon
                  icon="solar:three-squares-line-duotone"
                  width="20"
                  color='inherit'
                />
                {t('Border')}
              </StyledBox>
              <StyledBox
                onClick={() => setIsCardShadow(true)}
                sx={getBoxStyle(isCardShadow === true)}

                display='flex'
                gap={1}>
                <Icon
                  icon="solar:three-squares-bold-duotone"
                  width="20"
                  color='inherit'
                />
                {t('Shadow')}
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Theme Color setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant='h6' gutterBottom>
              {t('Theme Border Radius')}
            </Typography>

            <Slider
              size='small'
              value={isBorderRadius}
              aria-label='Small'
              min={4}
              max={24}
              onChange={(event: any) => setIsBorderRadius(event.target.value)}
              valueLabelDisplay='auto'
            />
          </Box>
        </Scrollbar>
      </Drawer>
    </div >)
  );
}

export default Customizer
