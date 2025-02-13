import { createContext, useState } from "react";
import { webApi } from "../webservice/api";

interface AuthContextData {
  signed: boolean;
  userId: number;
  setSigned: (token: string, userId: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [signed, setSigned] = useState(false);
  const [userId, setUserId] = useState(0);

  function handleSetSigned(token: string, signedUserId: number) {
    webApi.defaults.headers.Authorization = `Bearer ${token}`;
    setSigned(true);
    setUserId(signedUserId);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        userId,
        setSigned: handleSetSigned
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
