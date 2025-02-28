import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router";

export const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white" }}>
            Healthcare System
          </Link>
        </Typography>

        <Box>
          <Link to="/doctors" style={{ color: "white", marginRight: 15 }}>
            Врачи
          </Link>
          <Link to="/nurses" style={{ color: "white" }}>
            Медсестры
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
