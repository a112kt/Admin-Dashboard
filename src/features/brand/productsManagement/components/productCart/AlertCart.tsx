"use client";
import * as React from "react";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

interface Props {
  handleClose: (
    event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => void;
  openCartAlert: boolean;
}

const AlertCart = ({ handleClose, openCartAlert }: Props) => {
  const snackbarAnchor = useSnackbarAnchor("top");
  return (
    <React.Fragment>
      <Snackbar
        open={openCartAlert}
        anchorOrigin={snackbarAnchor}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%", color: "white" }}>
          Item Added to the Cart!!!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertCart;
