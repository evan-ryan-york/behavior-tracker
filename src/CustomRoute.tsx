import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import {PERMISSION} from "./libraries/objects"

interface CustomRouteProps {
  children: React.ReactNode;
  permission: PERMISSION;
}

const CustomRoute: FC<CustomRouteProps> = ({ children, permission }) => {
  const { isLoading, currentAuthUser } = useAuth();

  return (
    <>
      {currentAuthUser && !isLoading && children }
      {!currentAuthUser && !isLoading && (<Navigate to="/login" />)}
    </>
  )
};

export default CustomRoute;
