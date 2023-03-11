import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { HOME_URL, LOGIN_URL } from "../../constants/urls";
// import styles from "./PublicRoute.module.css";

export function PublicRoute({ children }) {
  const { user, isLoadingUser } = useUserContext();

  //TODO
  if (isLoadingUser) {
    return 
    <h1>LOADING USER...</h1>
    
  }

  if (!isLoadingUser && user) {
    return <Navigate to={HOME_URL} />;
  }

  return children;
}