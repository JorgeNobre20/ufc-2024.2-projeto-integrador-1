import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  isAuthRoute: boolean;
}

export const VerifiedRoute: React.ComponentType<Props> = ({
  isAuthRoute,
}) => {
  const { signed } = useAuth();

  if (isAuthRoute && signed) {
    return <Navigate to={"/"} />;
  }

  if (!isAuthRoute && !signed) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};
