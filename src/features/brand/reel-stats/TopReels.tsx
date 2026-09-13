'use client'
import { useTranslation } from 'react-i18next'
import { Box, Button, Chip, Link, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import BlankCard from '@/components/shared/BlankCard'
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

interface TopReelsProps {
  topViewedReels?: Array<{
    reelId: number;
    title: string;
    thumbnailUrl: string | null;
    views: number;
    likes: number;
  }>;
}

const TopReels = ({ topViewedReels }: TopReelsProps) => {
  const theme = useTheme()
  const { t } = useTranslation()


  // product detail list data

  type Reel = {
    src: string
    title: string
    views: string
    engagement: string
    status: string
    chipbgcolor: string
    chiptxtcolor: string
    watchTime: string
  }
  function getLikes(likes: number) {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(0)}K`
    }
    return likes.toString()
  }

  function getViews(views: number) {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`
    }
    return views.toString()
  }

  function getStatus(views: number) {
    if (views >= 1000) {
      return t('Viral')
    }
    if (views >= 50) {
      return t('Trending')
    }
    return t('Normal')
  }

  function getChipBgColor(views: number) {
    if (views >= 1000) {
      return theme.palette.error.light
    }
    if (views >= 50) {
      return theme.palette.success.light
    }
    return theme.palette.warning.light
  }

  function getChipTxtColor(views: number) {
    if (views >= 1000) {
      return theme.palette.error.main
    }
    if (views >= 50) {
      return theme.palette.success.main
    }
    return theme.palette.warning.main
  }



  const reels: Reel[] | [] = topViewedReels?.length ? topViewedReels.map(r => ({
    src: r.thumbnailUrl || '/images/dashboard/analytics/reelThumbnailPlaceholder.png',
    title: r.title,
    views: getViews(r.views),
    engagement: getLikes(r.likes),
    status: getStatus(r.views),
    chipbgcolor: getChipBgColor(r.views),
    chiptxtcolor: getChipTxtColor(r.views),
    watchTime: '—',
  })) : []


  return (
    <BlankCard>
      <Box p={3}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Typography variant='h5'>{t('Top Performing Reels')}</Typography>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            href="reels"
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
            {t('View All Reels')}
          </Button>
        </Stack>
        <Box mt={2.5}>
          <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Stack gap={2.5}>
              {reels?.length && reels.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    border: '1px solid',
                    borderColor: theme.palette.blackColor.black10,
                    padding: 1.5,
                    minWidth: '50rem',
                  }}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1.5}
                      sx={{ width: '33%' }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '6px',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={48}
                          height={48}
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>

                      <Typography
                        variant="body1"
                        fontWeight={500}
                        sx={{ maxWidth: '44%' }}
                      >
                        {item.title}
                      </Typography>
                    </Stack>
                    {/* customer name */}
                    <Stack gap={0.5} sx={{ width: '16%' }}>
                      <Typography variant='body2' color={theme.palette.blackColor.black60}>
                        {t('Views')}
                      </Typography>
                      <Typography variant='body1' fontWeight={500}>
                        {item.views}
                      </Typography>
                    </Stack>
                    {/* Qty */}
                    <Stack gap={0.5} sx={{ width: '8%' }}>
                      <Typography variant='body2' color={theme.palette.blackColor.black60}>
                        {t('Engagement')}
                      </Typography>
                      <Typography variant='body1' fontWeight={500} textAlign={"center"}>
                        {item.engagement}
                      </Typography>
                    </Stack>
                    {/* status */}
                    <Stack gap={0.5} sx={{ width: '12%' }}>
                      <Typography variant='body2' color={theme.palette.blackColor.black60}>
                        {t('Trending')}
                      </Typography>
                      <Chip
                        label={item.status}
                        size='small'
                        sx={{
                          bgcolor: `${item.chipbgcolor}`,
                          color: `${item.chiptxtcolor}`,
                          width: 'fit-content',
                        }}
                      />
                    </Stack>


                    {/* watch time */}
                    <Stack gap={0.5}>
                      <Typography variant='body2' color={theme.palette.blackColor.black60}>
                        {t('Avg Watch Time')}
                      </Typography>
                      <Typography variant='body1' fontWeight={500} textAlign={"center"}>
                        {item.watchTime}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </BlankCard>
  )
}

export default TopReels
