import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Astronomy from "../../../lib/astronomy.browser";
import MapDatePicker from "./MapDatePicker";

const BodyList = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];
const signName = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];
interface ChartPlanet {
  name: string;
  sign: string;
  hour: number;
  min: number;
  sec: number;
}
export default function MapView() {
  let observer = new Astronomy.Observer(-23.3052778, -45.9658333, 0);
  const planets = Array<ChartPlanet>();

  BodyList.forEach((body) => {
    let equ_ofdate = Astronomy.Equator(body, new Date(), observer, true, true);
    let hor = Astronomy.Horizon(
      new Date(),
      observer,
      equ_ofdate.ra,
      equ_ofdate.dec,
      "normal"
    );

    const degree = hor.ra * 15;
    const zodIndex = Math.floor(degree / 30);
    const lang30 = degree - zodIndex * 30;
    const hour = Math.floor(lang30);
    const minFrac = (lang30 - hour) * 60;
    const min = Math.floor(minFrac);
    const sec = Math.floor((minFrac - min) * 60);

    planets.push({
      name: body,
      sign: signName[zodIndex],
      hour,
      min,
      sec,
    });
  });

  return (
    <Grid size={12}>
      <MapDatePicker />
      {planets.map(({ name, sign, hour, min, sec }) => (
        <Box
          key={name}
          sx={{ backgroundColor: "#333" }}
        >{`${name} ${sign} - ${hour}°${min}'${sec}"`}</Box>
      ))}
    </Grid>
  );
}
