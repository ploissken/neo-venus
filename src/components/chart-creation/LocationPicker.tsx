import { ChartContext } from "@/context/ChartContext";
import { ChartLocation } from "@/lib/location.types";
import { Cancel, Search } from "@mui/icons-material";
import {
  Select,
  MenuItem,
  IconButton,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

export function LocationPicker() {
  const { loading, setLoading, setLocation } = useContext(ChartContext);

  const [inputValue, setInputValue] = useState("");
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
      <Grid container size="grow">
        <FormControl fullWidth>
          {hasLocationsLoaded ? (
            <>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                value={selectedLocationIndex}
                label="City"
                labelId="city-label"
                disabled={loading}
                onChange={(e) =>
                  setSelectedLocationIndex(e.target.value as number)
                }
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
            </>
          ) : (
            <TextField
              label="City"
              variant="outlined"
              value={inputValue}
              disabled={loading}
              onChange={(e) => setInputValue(e.target.value)}
              sx={{ height: "100%", width: "100%" }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="search city"
                        onClick={handleSearchLocation}
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        </FormControl>
      </Grid>

      {hasLocationsLoaded && (
        <Grid size={2} container justifyContent="center">
          <IconButton
            size="large"
            aria-label="clear city"
            onClick={handleClearLocation}
          >
            <Cancel />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}
