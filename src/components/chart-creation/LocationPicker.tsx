import { useChartContext, useSnackbar } from "@/hooks";
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
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export interface LocationPickerProps {
  onLocationChanged: (location?: ChartLocation) => void;
}

export function LocationPicker({ onLocationChanged }: LocationPickerProps) {
  const t = useTranslations();
  const { loading, setLoading } = useChartContext();
  const { showMessage } = useSnackbar();
  const [inputValue, setInputValue] = useState("");
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [locations, setLocations] = useState<ChartLocation[]>([]);

  const hasLocationsLoaded = locations.length > 0;

  const handleSearchLocation = async () => {
    if (!inputValue) {
      showMessage(t("chart.create.error.missing_city"), "warning");
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/get-geolocation?city=${inputValue}`);
    const data = await response.json();

    if (data.locations.length > 0) {
      setLocations(data.locations);
      setSelectedLocationIndex(0);
    } else {
      showMessage(
        t("chart.craete.error.no_results", {
          inputValue,
        }),
        "warning"
      );
    }

    setLoading(false);
  };

  const handleClearLocation = () => {
    setLocations([]);
    setSelectedLocationIndex(0);
    setInputValue("");
    onLocationChanged(undefined);
  };

  useEffect(() => {
    const location = locations[selectedLocationIndex];
    if (location) {
      onLocationChanged({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [selectedLocationIndex, locations, onLocationChanged]);

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
              <InputLabel id="city-label">{t("chart.create.city")}</InputLabel>
              <Select
                value={selectedLocationIndex}
                label={t("chart.create.city")}
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
              label={t("chart.create.city")}
              variant="outlined"
              value={inputValue}
              disabled={loading}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchLocation();
                }
              }}
              sx={{ height: "100%", width: "100%" }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={t("chart.create.search_city")}
                        onClick={handleSearchLocation}
                        loading={loading}
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
          <Button
            fullWidth
            color="info"
            aria-label={t("chart.create.clear_city")}
            onClick={handleClearLocation}
          >
            <Cancel />
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
