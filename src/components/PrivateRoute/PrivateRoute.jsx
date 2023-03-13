import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LOGIN_URL } from "../../constants/urls";
import styles from "../PrivateRoute/PrivateRoute.module.css";

export function PrivateRoute({ children }) {
  const { usuario, isLoadingUser } = useUserContext();

  if (isLoadingUser) {
    return <h1 className={styles.loadingScreen}>CARGANDO USUARIO...</h1>;
  }

  if (!isLoadingUser && !usuario) {
    return <Navigate to={LOGIN_URL} />;
  }

  return children;
}