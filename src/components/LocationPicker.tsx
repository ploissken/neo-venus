import { ChartContext } from "@/context/ChartContext";
import { ChartLocation } from "@/lib/location.types";
import { Cancel, Search } from "@mui/icons-material";
import { Select, MenuItem, IconButton, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";

export default function LocationPicker() {
  const { setLocation } = useContext(ChartContext);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [locations, setLocations] = useState<ChartLocation[]>([]);

  const hasLocationsLoaded = locations.length > 0;

  const handleSearchLocation = async () => {
    if (!inputValue) {
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/get-geolocation?city=${inputValue}`);
    const data = await response.json();

    if (data.locations.length > 0) {
      setLocations(data.locations);
      setSelectedLocationIndex(0);
    } else {
      // TODO: display "no cities found" warning
    }

    setLoading(false);
  };

  const handleClearLocation = () => {
    setLocations([]);
    setSelectedLocationIndex(0);
    setInputValue("");
    setLocation(undefined);
  };

  useEffect(() => {
    const location = locations[selectedLocationIndex];
    if (location) {
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [selectedLocationIndex, locations, setLocation]);

  return (
    <Grid
      container
      size={12}
      spacing={2}
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Grid size="grow">
        {hasLocationsLoaded ? (
          <Select
            value={selectedLocationIndex}
            label="city"
            onChange={(e) => setSelectedLocationIndex(e.target.value as number)}
            sx={{ height: "100%", width: "100%" }}
          >
            {locations.map((location: ChartLocation, index: number) => (
              <MenuItem key={index} value={index}>
                <>
                  <Typography variant="caption">
                    {`${location.name} (${location.displayName})`}
                  </Typography>
                </>
              </MenuItem>
            ))}
          </Select>
        ) : (
          <TextField
            label="city"
            variant="outlined"
            value={inputValue}
            disabled={loading}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ height: "100%", width: "100%" }}
          />
        )}
      </Grid>
      <Grid size={2} container justifyContent="center" alignItems="stretch">
        {hasLocationsLoaded ? (
          <IconButton
            aria-label="cancel"
            onClick={handleClearLocation}
            sx={{ height: "100%", width: "100%" }}
          >
            <Cancel />
          </IconButton>
        ) : (
          <IconButton
            aria-label="search"
            onClick={handleSearchLocation}
            sx={{ height: "100%", width: "100%" }}
          >
            <Search />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}
