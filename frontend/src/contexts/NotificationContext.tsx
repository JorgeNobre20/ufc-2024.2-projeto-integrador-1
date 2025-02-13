import { createContext, useState } from "react";
import { SnackBar } from "../components";

interface NotificationContextData {
  showMessage: (message: string, error: boolean) => void;
  close: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

interface NotificationContextProviderProps {
  children: React.ReactNode;
}

export function NotificationContextProvider({ children }: NotificationContextProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function showMessage(message: string, error: boolean) {
    setOpen(true);
    setMessage(message);
    setError(error);
  }

  function close() {
    setOpen(false);
    setMessage("");
    setError(false);
  }

  return (
    <NotificationContext.Provider
      value={{
        showMessage,
        close,
      }}
    >
      <SnackBar 
        open={open}
        message={message}
        error={error}
        handleClose={close}
      />
      {children}
    </NotificationContext.Provider>
  );
}
