import { Icon } from '@iconify/react'
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material'

interface RecordCardProps {
  heading: string
  value: string | number
  subvalue: string
  percentage: string
  arrowicon: string
  arrowcolor: string
  arrowbgcolor: string
  producticon: string
  productcolor: string
  productbgcolor: string
}

const RecordCard: React.FC<RecordCardProps> = ({
  heading,
  value,
  subvalue,
  percentage,
  arrowicon,
  arrowcolor,
  arrowbgcolor,
  producticon,
  productcolor,
  productbgcolor,
}) => {
  const theme = useTheme()

  return (
    <Box p={3}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack gap={2.5}>
          <Typography variant='h6' fontWeight={500}>
            {heading}
          </Typography>
          <Box>
            <Typography variant='h3'>{value}</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography
                variant='body2'
                sx={{
                  color: theme.palette.blackColor.black60,
                }}>
                {subvalue}
              </Typography>
              <Box
                display='inline-flex'
                alignItems='center'
                px={1}
                py={0.2}
                borderRadius={16}
                bgcolor={arrowbgcolor}
                color={arrowcolor}>
                <Typography variant='body2' fontWeight={500} mr={0.5}>
                  {percentage}
                </Typography>
                <Icon icon={arrowicon} width='16' height='16' />
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Avatar
          sx={{
            bgcolor: productbgcolor,
            color: productcolor,
          }}>
          <Icon icon={producticon} width={24} height={24} />
        </Avatar>
      </Stack>
    </Box>
  )
}

export default RecordCard
