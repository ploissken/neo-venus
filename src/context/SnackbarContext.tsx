import { Snackbar, Alert, AlertColor, Slide } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";

export type SnackbarContextType = {
  showMessage: (message: string, severity?: AlertColor) => void;
};

type SnackbarMessage = {
  key: number;
  message: string;
  severity: AlertColor;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<SnackbarMessage[]>([]);

  const showMessage = (message: string, severity = "info") => {
    setToasts((previousToasts) => [
      ...previousToasts,
      {
        message,
        severity: severity as AlertColor,
        key: new Date().getTime() + Math.random(),
      },
    ]);
  };

  const dismissSnackbar = (key: number) => {
    setToasts((prev) => prev.filter((msg) => msg.key !== key));
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      {toasts.map(({ key, message, severity }, index) => (
        <Snackbar
          key={key}
          open
          autoHideDuration={6000}
          onClose={(event, reason) => {
            event?.preventDefault();
            if (reason !== "clickaway") {
              dismissSnackbar(key);
            }
          }}
          slots={{ transition: Slide }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: `${index * 60}px`, cursor: "pointer" }}
        >
          <Alert
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
            onClick={() => dismissSnackbar(key)}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};
