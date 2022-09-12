import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { mainContext } from "./context/MainContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(mainContext);

  //   const user = null;

  return user?.token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
