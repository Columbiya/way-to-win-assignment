import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <Link href="/" sx={{ color: "white" }}>
            Healthcare System
          </Link>
        </Typography>

        <Box>
          <Link href="/doctors" sx={{ color: "white", marginRight: 4 }}>
            Врачи
          </Link>
          <Link href="/nurses" sx={{ color: "white" }}>
            Медсестры
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
