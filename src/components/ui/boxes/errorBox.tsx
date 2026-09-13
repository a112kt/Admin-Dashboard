import { Typography, Box } from "@mui/material";
export default function ErrorBox({ errorMessage }: { errorMessage: string }) {
    return (
        <Box
            mx="auto"
            mt="16px"
            p="12px"
            borderRadius="8px"
            bgcolor={"#FEE2E2"}
            border="1px solid"
            borderColor={
                "#F87171"
            }
            textAlign="center"
        >
            <Typography
                fontSize="14px"
                fontWeight="500"
                color={
                    "#E31A1A"
                }
            >
                {errorMessage}
            </Typography>
        </Box>
    )
}

