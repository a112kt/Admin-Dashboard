'use client'
import * as React from 'react';
import { Snackbar, Alert, AlertTitle, SnackbarCloseReason, useTheme, IconButton, Typography } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

const Welcome = () => {

    const { t } = useTranslation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const snackbarAnchor = useSnackbarAnchor("top");

    const handleClick = () => {
        setOpen(true);
    };

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const handleAlertClose = (event: React.SyntheticEvent) => {
        setOpen(false);
    };

    React.useEffect(() => {

        const timer = setTimeout(() => {
            handleClick();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <React.Fragment>

            <Snackbar
                open={open}
                anchorOrigin={snackbarAnchor}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleAlertClose}

                    variant="filled"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleAlertClose}
                        >
                            <IconX width={20} color="white" />
                        </IconButton>
                    }
                    sx={{ backgroundColor: theme.palette.primary.main, }}
                >
                    <AlertTitle sx={{ color: 'white' }}>{t('Welcome to Brand Dashboard')}</AlertTitle>
                    <Typography variant="body2" sx={{ color: 'white' }}>
                        {t('Your dashboard is ready! Track your sales and content performance in one place.')}
                    </Typography>
                </Alert>
            </Snackbar >
        </React.Fragment >
    );
};

export default Welcome;
