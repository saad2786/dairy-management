import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "10px",
      }}
    >
      <CircularProgress sx={{ color: "white" }} size={20} thickness={4} />
      <Typography sx={{ fontSize: "16px" }}>Loading...</Typography>
    </Box>
  );
}
