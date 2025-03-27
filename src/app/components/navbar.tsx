"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AccountCircle, Home, Info, Login } from "@mui/icons-material";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const routes = [
    { text: "Home", icon: <Home />, route: "/" },
    { text: "Profile", icon: <AccountCircle />, route: "/user-profile" },
    { text: "About", icon: <Info />, route: "/about" },
    { text: "Sign In", icon: <Login />, route: "/sign-in" },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {routes.map(({ text, icon, route }) => (
          <Link href={route} key={text}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                {text}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
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
