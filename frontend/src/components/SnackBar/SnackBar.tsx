import { Snackbar, Alert } from "@mui/material";

interface SnackBarProps {
  open: boolean;
  message: string;
  error: boolean;
  handleClose: () => void;
}

export function SnackBar({ open, message, error, handleClose }: SnackBarProps) {
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
