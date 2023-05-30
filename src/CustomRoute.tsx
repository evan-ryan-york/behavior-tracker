import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";

interface CustomRouteProps {
  children: React.ReactNode;
}

const CustomRoute = ({ children }: CustomRouteProps) => {
  const { loading, currentAuthUser } = useContext(AuthContext);

  return (
    <>
      {currentAuthUser && !loading && children}
      {!currentAuthUser && !loading && <Navigate to="/login" />}
    </>
  );
};

export default CustomRoute;
