import { Paper, Typography, Backdrop, Box, LinearProgress } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
};

function LoadingBackdrop({ open, message }: Props) {
  return (
    <Backdrop open={open}>
      <Box sx={{ position: "fixed", width: "50VW", top: "20VH" }}>
        <Paper sx={{ width: "50VW", padding: 2, textAlign: "center" }}>
          <Typography variant="h4">{message}</Typography>
          <LinearProgress sx={{ mt: 2 }} />
        </Paper>
      </Box>
    </Backdrop>
  );
}

export default LoadingBackdrop;