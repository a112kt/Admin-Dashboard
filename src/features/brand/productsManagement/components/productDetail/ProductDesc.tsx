"use client"
import React from 'react';
import {
  Box, Typography, LinearProgress, Tabs, Tab, Grid,
  Stack, Rating, Button, Paper,
  Divider,
} from '@mui/material';
import { IconPencil } from '@tabler/icons-react';
import ChildCard from '@/components/shared/ChildCard';
import BlankCard from '@/components/shared/BlankCard';
import { ProducctDetailRes } from '../../types';
import { CheckedIcon, CloseIcon } from '@/components/ui/icons/icons';

interface ProductCardProps {
  like: number;
  star: number;
  value?: number;
}

interface TabProps {
  children: React.ReactNode;
  index: number;
  value?: number;
}

function ProgressBar({ like, star, value, ...others }: ProductCardProps) {
  return (
    <Box display={'flex'} alignItems="center" gap="20px">
      <Box sx={{ minWidth: 50 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(star)} Stars`}</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress value={value ? value * 10 : 0} variant="determinate" color="primary" {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="subtitle2">{`(${Math.round(like)})`}</Typography>
      </Box>
    </Box>
  );
}
function mapBooleanToIcon(value: string) {
  if (value == "true") {
    return (
      <Box sx={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1, backgroundColor: 'green' }}>
        <CheckedIcon color='white' />
      </Box>
    )
  } else {
    return <Box sx={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1, backgroundColor: 'red', padding: "5px" }}>
      <CloseIcon color='white' />
    </Box>
  }
}

const TabPanel = (props: TabProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const ProductDesc = ({ productData }: { productData: ProducctDetailRes }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BlankCard sx={{ padding: 3 }}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'grey.100' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" allowScrollButtonsMobile scrollButtons indicatorColor="primary">
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Information" {...a11yProps(1)} />
            <Tab label="Reviews" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {productData?.description ? (
            <Box mt={4}><div dangerouslySetInnerHTML={{ __html: productData.description }} /></Box>
          ) : (
            <Typography variant="body1" color="textSecondary" mt={4}>No description available.</Typography>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 12 }}>
              {!productData?.productInformations?.length ? (
                <Typography variant="body1" color="textSecondary">No additional information available.</Typography>
              ) : productData.productInformations.map((info, index) => (
                <Stack key={index} flexDirection={"row"} gap={2} justifyContent="flex-start" alignItems="center" p={1}>
                  <Typography variant='h5'>
                    {info.key} : {" "}
                  </Typography>
                  <Typography variant="body1">
                    {info.value != "true" && info.value != "false" ? info.value : mapBooleanToIcon(info.value)}
                  </Typography>
                  <Divider />

                </Stack>
              ))}
            </Grid>

          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {!productData?.reviewsSummary?.totalReviews ? (
            <Typography variant="body1" color="textSecondary">No reviews yet.</Typography>
          ) : (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, lg: 4 }}>
                <Paper variant="outlined" sx={{ height: '100%', p: 3 }}>
                  <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: '100%' }}>
                    <Typography variant="subtitle1">Average Rating</Typography>
                    <Typography variant="h1" color="primary" fontWeight={600}>{productData.reviewsSummary.averageRating}</Typography>
                    <Rating name="rate" value={productData.reviewsSummary.averageRating} />
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid size={12}><ProgressBar star={0} value={productData.reviewsSummary.ratingDistribution[0]} like={productData.reviewsSummary.ratingDistribution[0]} /></Grid>
                    <Grid size={12}><ProgressBar star={1} value={productData.reviewsSummary.ratingDistribution[1]} like={productData.reviewsSummary.ratingDistribution[1]} /></Grid>
                    <Grid size={12}><ProgressBar star={2} value={productData.reviewsSummary.ratingDistribution[2]} like={productData.reviewsSummary.ratingDistribution[2]} /></Grid>
                    <Grid size={12}><ProgressBar star={3} value={productData.reviewsSummary.ratingDistribution[3]} like={productData.reviewsSummary.ratingDistribution[3]} /></Grid>
                    <Grid size={12}><ProgressBar star={4} value={productData.reviewsSummary.ratingDistribution[4]} like={productData.reviewsSummary.ratingDistribution[4]} /></Grid>
                    <Grid size={12}><ProgressBar star={5} value={productData.reviewsSummary.ratingDistribution[5]} like={productData.reviewsSummary.ratingDistribution[5]} /></Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </TabPanel>

      </Box>
    </BlankCard>
  );
};

export default ProductDesc;
