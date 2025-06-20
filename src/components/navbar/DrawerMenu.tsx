"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { AutoAwesome, Home, Info, Logout, ViewList } from "@mui/icons-material";
import { useTranslations } from "next-intl";
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
import NextLink from "next/link";
import { useUser } from "@/context";
import { useRouter } from "next/navigation";

export function DrawerMenu() {
  const t = useTranslations();
  const { isLoggedIn, logout } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (state: boolean) => {
    setOpen(state);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  const routes = [
    { text: t("menu.home"), icon: <Home />, route: "/" },
    {
      text: t("menu.create_chart"),
      icon: <AutoAwesome />,
      route: "/create-chart",
    },
    {
      text: t("menu.my_charts"),
      icon: <ViewList />,
      route: "user/charts",
      auth: true,
    },
    { text: t("menu.about"), icon: <Info />, route: "/about" },
  ].filter((route) => !route.auth || (route.auth && isLoggedIn));

  const DrawerList = (
    <Grid container sx={{ width: 250, m: 2 }}>
      <LogoWithTitle size={40} color="white" />
      <List sx={{ mt: 4, width: "100%" }}>
        <nav role="navigation" aria-label="main menu">
          {routes.map(({ text, icon, route }) => (
            <Link
              component={NextLink}
              href={route}
              key={text}
              sx={{ textDecoration: "none" }}
              onClick={() => toggleDrawer(false)}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  {text}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          {isLoggedIn && (
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                {t("menu.logout")}
              </ListItemButton>
            </ListItem>
          )}
        </nav>
      </List>
    </Grid>
  );

  return (
    <>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
