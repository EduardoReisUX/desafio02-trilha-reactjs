import { memo } from "react";
import { GenreResponseProps, MovieProps } from "../@types";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
}

function ContentComponent({ selectedGenre, movies }: ContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.movies, nextProps.movies);
});
