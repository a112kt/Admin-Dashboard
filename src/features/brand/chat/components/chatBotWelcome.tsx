import { useTranslation } from 'react-i18next';
import { Box, Typography, Paper } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function ChatBotWelcome() {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        textAlign: "center",
      }}
    >
      <ShoppingBagOutlinedIcon
        sx={{
          fontSize: 48,
          color: "primary.main",
          mb: 1,
        }}
      />

      <Typography variant="h5" fontWeight={600}>
        {t('Welcome to Shop Assistant')}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        {t('Looking for something today?')}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        {t('Ask me about products, prices, recommendations, or order information.')}
      </Typography>
    </Paper>
  );
}