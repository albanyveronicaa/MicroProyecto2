import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { HOME_URL, LOGIN_URL } from "../../constants/urls";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/auth";
import { useState } from "react";

export function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setData] = useState({});

  const onSuccess = () => {
    navigate(HOME_URL);
  };

  const onFail = (_error) => {
    console.log("Registro denegado, vuelve a intentar");
  };

  const onChange = (event) => {
    setData((oldData) => ({
      ...oldData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await registerWithEmailAndPassword({
      userData: formData,
      onSuccess,
      onFail,
    });
  };

  const handleGoogleClick = async () => {
    await signInWithGoogle({
      onSuccess: () => navigate(HOME_URL),
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.contenedor}>
        <form className={styles.form}>
          <h1 className={styles.titulo}>Crea una cuenta</h1>

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

          <div className={styles.inputContenedor}>
            <label htmlFor="name">
              <span>Ingresa tu nombre</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
              onChange={onChange}
            />
          </div>

          <div className={styles.inputContenedor}>
            <label htmlFor="email">
              <span>Ingresa tu correo</span>
            </label>
            <input
              placeholder="Correo"
              type="email"
              name="email"
              id="email"
              onChange={onChange}
            />
          </div>

          <div className={styles.inputContenedor}>
            <label htmlFor="password">
              <span>Ingresa tu contraseña</span>
            </label>
            <input
              placeholder="********"
              type="password"
              name="password"
              id="password"
              onChange={onChange}
            />
          </div>

          <div className={styles.inputContenedor}>
            <label htmlFor="age">
              <span>Ingresa tu edad</span>
            </label>
            <input
              placeholder="Edad"
              type="number"
              name="age"
              id="age"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            Registrarse
          </button>

          <Link to={LOGIN_URL} className={styles.loginRedirect}>
            ¿Ya tienes una cuenta?{" "}
            <span className={styles.redirectLink}>Inicia sesión.</span>
          </Link>
        </form>
      </div>
    </div>
  );
}