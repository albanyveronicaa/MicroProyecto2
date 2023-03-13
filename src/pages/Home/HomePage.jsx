import { useEffect } from "react";
import Card from "../../components/Card/Card";
import { App } from "../../App";
import styles from "../Home/HomePage.module.css";

export function HomePage() {
  const { movies, fetchMovies } = App();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.contenedor}>
          <h1 className={styles.titulo}>Películas actuales</h1>

          <div className={styles.movies}>
            {movies.map((movie) => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
