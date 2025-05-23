"use client";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { DrawerMenu } from "./DrawerMenu";
import { LogoWithTitle } from "../logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useUser } from "@/context";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isLoggedIn } = useUser();
  const t = useTranslations();
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <LogoWithTitle size={40} color="white" />
          {!isLoggedIn && (
            <>
              <Button onClick={() => router.push("/user/sign-in")}>
                {t("menu.sign_in")}
              </Button>
              <Button onClick={() => router.push("/user/sign-up")}>
                {t("menu.sign_up")}
              </Button>
            </>
          )}
          <LocaleSwitcher />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
