"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AccountCircle, Home, Info, Login } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
    <Box sx={{ width: 250 }} role="presentation">
      <Typography variant="h5" sx={{ m: 2 }}>
        mercuryou
      </Typography>
      <List>
        {routes.map(({ text, icon, route }) => (
          <Link href={route} key={text} sx={{ textDecoration: "none" }}>
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
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
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
    </>
  );
}
