import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { Box, Typography } from "@mui/material";
import { CalendarIcon } from '../icons/icons';

export default function BirthDatePicker({ value, onChange, error, helperText, disabled }: { value: Dayjs | null, onChange: (value: Dayjs | null) => void, error: boolean | undefined, helperText: string | undefined, disabled?: boolean }) {
    const [open, setOpen] = useState(false);
    const maxDate = dayjs().subtract(16, "year");
    const [maxDateError, setMaxDateError] = useState<boolean>(false)

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
            <Typography sx={{ fontWeight: 600, color: "text.primary", fontSize: "16px", mb: "5px", mt: "25px" }}>Date of Birth</Typography>

            <Box bgcolor={"white"} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disabled={disabled}
                        value={value}
                        onChange={(e) => {
                            if (e && e > maxDate) {
                                setMaxDateError(true)
                                return
                            }
                            setMaxDateError(false)
                            onChange(e)

                        }}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => {
                            setOpen(false);
                        }}
                        disableFuture
                        maxDate={maxDate}
                        slots={{
                            openPickerIcon: CalendarIcon,
                        }}
                        slotProps={{
                            textField: {
                                error: !!error,
                                fullWidth: true,
                                sx: {
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        width: '100%',
                                        backgroundColor: 'white',
                                    },
                                    '& .MuiPickersSectionList-root': {
                                        padding: '12px',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'divider',
                                    },
                                    "fieldset": {
                                        borderRadius: '12px'
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "primary.main",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "primary.main",
                                        borderWidth: "2px",
                                    },
                                },
                            },
                            popper: {
                                sx: {
                                    '& .MuiPaper-root': {
                                        borderRadius: '12px',
                                        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)',
                                        marginTop: '8px',
                                    },
                                    '& .MuiPickersDay-root': {
                                        color: '#1B2351 !important', // Force primary color for all states
                                        fontWeight: '500',
                                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                        '&:hover': {
                                            backgroundColor: '#47C0D233', // Light secondary on hover
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: '#47C0D2 !important', // Secondary background
                                            color: '#1B2351 !important', // Ensure primary text even when selected
                                            fontWeight: '700',
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: '#47C0D2CC !important',
                                        },
                                        '&.Mui-selected:focus': {
                                            backgroundColor: '#47C0D2 !important',
                                        },
                                        '&:focus': {
                                            backgroundColor: 'transparent',
                                            color: '#1B2351 !important',
                                        },
                                    },
                                    '& .MuiPickersDay-today': {
                                        borderColor: '#1B2351 !important', // Primary border for today
                                    },
                                    '& .MuiTypography-root': {
                                        color: '#1B2351', // Header/Weekday names in primary
                                    },
                                    '& .MuiIconButton-root': {
                                        color: '#1B2351', // Nav arrows in primary
                                    },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            </Box>
            {error && <Typography variant="body2" color="error" mt={"2px"}>{helperText}</Typography>}
            {maxDateError && <Typography variant="body2" color="error" mt={"2px"}>You must be at least 16 years old to register.</Typography>}
        </Box>
    );
}
