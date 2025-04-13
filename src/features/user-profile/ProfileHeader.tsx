import Grid from "@mui/material/Grid";
import Image from "next/image";
import capriconCover from "@/assets/images/covers/capricorn.jpg";
import defaultAvatar from "@/assets/images/avatar/default-1.png";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

export default function ProfileHeader({}) {
  return (
    <Grid container size={12}>
      <Image
        src={capriconCover}
        alt="capricon cover"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <Grid container size={12} sx={{ position: "relative", mb: "100px" }}>
        <Avatar
          sx={{
            width: 200,
            height: 200,
            position: "absolute",
            top: -100,
            left: 16,
          }}
        >
          <Image
            src={defaultAvatar}
            alt="User Avatar"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Avatar>
        <Grid container size={12} sx={{ height: "100px", pt: "100px" }}>
          <Typography sx={{ p: 2 }} variant="h5">
            Polegarina Escargot
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
