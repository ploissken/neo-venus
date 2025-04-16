import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import DrawerMenu from "./DrawerMenu";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            neo-vuenus
          </Typography>
          <Button color="inherit" disabled>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
