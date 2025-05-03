import { Box, AppBar, Toolbar } from "@mui/material";
import { DrawerMenu } from "./DrawerMenu";
import { LogoWithTitle } from "../logo";
import { LocaleSwitcher } from "./LocaleSwitcher";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <LogoWithTitle size={40} color="white" />
          <LocaleSwitcher />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
