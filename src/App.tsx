import "./styles/global.scss";
import { SideBar } from "./components/SideBar";
import "./styles/sidebar.scss";
import { Content } from "./components/Content";
import "./styles/content.scss";

import { MovieProps, GenreResponseProps } from "./@types";

import { useCallback, useEffect, useState } from "react";
import { api } from "./services/api";

type AllStates = {
  selectedGenreId: number;
  movies: MovieProps[];
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps;
};

export function App() {
  const [allStates, setAllStates] = useState<AllStates>({
    selectedGenreId: 1,
    movies: [],
    genres: [],
    selectedGenre: {} as GenreResponseProps,
  });
  const { selectedGenre, movies, genres, selectedGenreId } = allStates;

  function updateStates(id: number = 1) {
    let datas = allStates;
    datas.selectedGenreId = id;

    api
      .get<MovieProps[]>(`movies/?Genre_id=${allStates.selectedGenreId}`)
      .then((response) => {
        datas.movies = response.data;
      });

    api
      .get<GenreResponseProps>(`genres/${allStates.selectedGenreId}`)
      .then((response) => {
        datas.selectedGenre = response.data;
      });

    api
      .get<GenreResponseProps[]>("genres")
      .then((response) => {
        datas.genres = response.data;
      })
      .finally(() => {
        setAllStates({
          ...datas,
        });
      });
  }

  useEffect(() => {
    updateStates();
  }, []);

  const handleClickButton = useCallback((id: number) => {
    if (id === allStates.selectedGenreId) return;

    updateStates(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
        genres={genres}
      />
      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
}
