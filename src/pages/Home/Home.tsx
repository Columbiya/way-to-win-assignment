import { Box, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1">Выберите страницу в шапке</Typography>
    </Box>
  );
};
