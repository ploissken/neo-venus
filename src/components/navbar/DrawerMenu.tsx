"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { Home, Info } from "@mui/icons-material";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Drawer,
  IconButton,
  Link,
  Grid,
} from "@mui/material";
import { LogoWithTitle } from "../logo";

export function DrawerMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const routes = [
    { text: "Home", icon: <Home />, route: "/" },
    { text: "About", icon: <Info />, route: "/about" },
  ];

  const DrawerList = (
    <Grid container sx={{ width: 250, m: 2 }}>
      <LogoWithTitle size={40} color="white" />
      <List sx={{ mt: 4, width: "100%" }}>
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
    </Grid>
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
