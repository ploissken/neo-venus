import { useSnackbar, useFetch } from "@/hooks";
import { ChartLocation } from "@/lib/chart";
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
  Tooltip,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

export interface LocationPickerProps {
  onChange: (location: ChartLocation | undefined) => void;
  onLocationsLoaded?: (locations: ChartLocation[]) => void;
  startingLocations?: ChartLocation[];
  value?: ChartLocation;
  error?: FieldError;
}

export function LocationPicker({
  value,
  onChange,
  onLocationsLoaded,
  startingLocations = [],
  error,
}: LocationPickerProps) {
  const t = useTranslations();
  const { showMessage } = useSnackbar();
  const { anonFetch } = useFetch();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(
    value && startingLocations?.length > 0
      ? startingLocations.findIndex(
          (location) =>
            location.latitude === value.latitude &&
            location.longitude === value.longitude
        )
      : 0
  );
  const [locations, setLocations] =
    useState<ChartLocation[]>(startingLocations);

  const hasLocationsLoaded = locations.length > 0;

  const trimLocationDisplayName = (locationName: string) => {
    return locationName.length > 50
      ? `${locationName.slice(0, 50)}...`
      : locationName;
  };

  const handleSearchLocation = async () => {
    if (!inputValue) {
      showMessage(t("chart.create.error.missing_city"), "warning");
      return;
    }

    setLoading(true);

    const response = await anonFetch<{ locations: ChartLocation[] }>(
      `/api/chart/get-geolocation?city=${inputValue}`
    );

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const {
      data: { locations },
    } = response;

    if (locations?.length > 0) {
      setLocations(locations);
      onLocationsLoaded?.(locations);
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
    onLocationsLoaded?.([]);
    setSelectedLocationIndex(0);
    setInputValue("");
    onChange(undefined);
  };

  useEffect(() => {
    const location = locations[selectedLocationIndex];
    if (location) {
      onChange(location);
    }
  }, [selectedLocationIndex, locations, onChange]);

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
                    <Typography variant="caption">
                      {trimLocationDisplayName(location.displayName)}
                    </Typography>
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
              error={!!error?.message}
              helperText={!!error?.message && error?.message}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchLocation();
                }
              }}
              sx={{
                height: "100%",
                width: "100%",
                "& .MuiInputBase-root": {
                  p: 0,
                },
              }}
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
          <Tooltip title={t("chart.create.clear_city")}>
            <Button
              fullWidth
              color="info"
              aria-label={t("chart.create.clear_city")}
              onClick={handleClearLocation}
            >
              <Cancel />
            </Button>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
}
