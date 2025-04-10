import { Cancel } from "@mui/icons-material";
import { Select, MenuItem, ListItemText, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function LocationPicker() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [locations, setLocations] = useState([]);

  const handleBlur = async () => {
    setLoading(true);
    const response = await fetch(`/api/get-geolocation?city=${inputValue}`);
    const data = await response.json();
    console.log("FE data", data);
    setLocations(data.locations);
    setLoading(false);
  };

  const handleClearLocation = () => {
    setLocations([]);
    setSelectedLocation(0);
    setInputValue("");
  };

  return locations.length > 0 ? (
    <>
      <Select
        value={selectedLocation}
        label="Location"
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {locations.map((location, index) => (
          <MenuItem key={index} value={index}>
            <ListItemText
              primary={location.name}
              secondary={location.displayName}
            />
          </MenuItem>
        ))}
      </Select>
      <IconButton aria-label="cancel" onClick={handleClearLocation}>
        <Cancel />
      </IconButton>
    </>
  ) : loading ? (
    <>hm</>
  ) : (
    <TextField
      label="city"
      variant="outlined"
      onBlur={handleBlur}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
