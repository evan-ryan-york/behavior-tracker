import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
import { PERMISSION } from "./libraries/objects";

interface CustomRouteProps {
  children: React.ReactNode;
  permission: PERMISSION;
}

const CustomRoute = ({ children, permission }: CustomRouteProps) => {
  const { loading, currentAuthUser } = useContext(AuthContext);

  return (
    <>
      {currentAuthUser && !loading && children}
      {!currentAuthUser && !loading && <Navigate to="/login" />}
    </>
  );
};

export default CustomRoute;
