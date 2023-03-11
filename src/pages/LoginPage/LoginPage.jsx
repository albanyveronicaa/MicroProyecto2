import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { HOME_URL, REGISTER_URL } from "../../constants/urls";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSuccess = () => {
    navigate(HOME_URL);
  };

  const onFail = (_error) => {
    console.log("LOGIN FAILED, Try Again");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await loginWithEmailAndPassword({ userData: formData, onSuccess, onFail });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setFormData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleGoogleClick = async () => {
    await signInWithGoogle({
      onSuccess: () => navigate(HOME_URL),
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.contenedor}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h1 className={styles.titulo}>Iniciar Sesión</h1>
          
          <div className={styles.googleButton}>
            <button type="button" onClick={handleGoogleClick}>
              <div className={styles.contenido}>
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt=""
                />
                <span class="text">Continuar con Google</span>
              </div>
            </button>
          </div>

          <p className={styles.txt}>
            ------------------------------O------------------------------ Ingresar con tu correo
            y contraseña
          </p>

          {/* EMAIL FIELD */}
          <div className={styles.inputContenedor}>
            <label htmlFor="email">
              <span>Ingresa tu correo</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo"
              onChange={onChange}
            />
          </div>

          {/* PASSWORD FIELD */}
          <div className={styles.inputContenedor}>
            <label htmlFor="password">
              <span>Ingresa tu contraseña</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={onChange}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>

          

          <Link to={REGISTER_URL} className={styles.loginRedirect}>
            ¿No tienes una cuenta?{" "}
            <span className={styles.redirectLink}>Regístrate.</span>
          </Link>
        </form>
      </div>
    </div>
  );
}