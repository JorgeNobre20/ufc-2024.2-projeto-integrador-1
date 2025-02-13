import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export function useNotification() {
  const contextData = useContext(NotificationContext);
  return {...contextData};
}