import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { DrawerMenu } from "./DrawerMenu";
import { LogoWithTitle } from "../logo";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <LogoWithTitle size={40} color="white" />
          <Button color="inherit" disabled>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
