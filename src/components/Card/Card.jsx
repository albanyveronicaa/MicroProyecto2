import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../utils/the-movie-db-api";

function Card({ movie }) {
  return (
    <div className={styles.contenedor}>
      {" "}
      <div>
        <img src={`${IMAGE_URL + movie.poster_path}`} className={styles.img} />
      </div>
      <div className={styles.infoContenedor}>
        <div>
          <div className={styles.info}>
            <h2 className={styles.name}>{movie.title}</h2>
          </div>
        </div>

        <div className={styles.infoContenedor}>
          <div className={styles.infoContenedor}>
            <h3 className={styles.subtitulo}>Descripción:</h3>
            <p>{movie.overview}</p>
          </div>
          <div className={styles.infoContenedor}>
            <h3 className={styles.subtitulo}>
              {" "}
              Lenguaje original:</h3>
              <p>{movie.original_language}</p>
            
          </div>
          <div className={styles.infoContenedor}>
            <h3 className={styles.subtitulo}>
              {" "}
              Fecha de lanzamiento:</h3>
              <p>{movie.release_date}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
