import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/selectors";

export const PrivateRoute = ({ children }) => {
  const token = useSelector(selectToken);
  return token ? children : <Navigate to="/" />;
};
