import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
