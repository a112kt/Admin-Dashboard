"use client";
import React from "react";
import {
  Typography, Box, Table, TableBody, TableCell, TableHead,
  TableRow, Avatar, TableContainer, Stack, Rating,
} from "@mui/material";
import type { ReviewType } from "../../types";

const defaultImg = "/images/profile/user-1.png";

interface CustomersReviewsProps {
  reviews: ReviewType[];
}

const CustomersReviews = ({ reviews }: CustomersReviewsProps) => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>Customer Reviews</Typography>
      {reviews.length === 0 ? (
        <Typography color="textSecondary" variant="body2">No reviews yet.</Typography>
      ) : (
        <TableContainer>
          <Table aria-label="customer reviews table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 0 }}><Typography variant="subtitle2" fontWeight={600}>Customer</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight={600}>Comment</Typography></TableCell>
                <TableCell><Typography textAlign="right" variant="subtitle2" fontWeight={600}>Date</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell sx={{ pl: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar src={review.customerImage || defaultImg} alt={review.customerName} sx={{ width: 35, height: 35 }} />
                      <Typography variant="subtitle2" fontWeight={600}>{review.customerName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography color="textSecondary" variant="subtitle2" fontSize="14px" fontWeight={400} sx={{ maxWidth: { lg: "350px", xs: "150px" }, whiteSpace: "wrap" }}>{review.comment}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" textAlign="right">{review.createdAt}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CustomersReviews;
