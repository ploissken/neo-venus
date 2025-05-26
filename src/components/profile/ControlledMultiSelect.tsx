import { Autocomplete, TextField } from "@mui/material";
import {
  Controller,
  Control,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";

type OptionType = {
  id: string;
  label: string;
};

type ControlledMultiSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: OptionType[];
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
};

export function ControlledMultiSelect<T extends FieldValues>({
  name,
  control,
  options,
  label,
  defaultValue,
}: ControlledMultiSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOptions = options.filter((option) =>
          ((value as string[]) ?? []).includes(option.id)
        ) as OptionType[];

        return (
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedOptions}
            onChange={(_, newValue) =>
              onChange(newValue.map((option) => option.id))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        );
      }}
    />
  );
}
