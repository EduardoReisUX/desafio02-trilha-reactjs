import { memo } from "react";
import { GenreResponseProps } from "../@types";
import { Button } from "./Button";

interface SideBarProps {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

function SideBarComponent({
  handleClickButton,
  selectedGenreId,
  genres,
}: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return (
    Object.is(prevProps.genres, nextProps.genres) &&
    Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId)
  );
});

// memo -> props are different?
// useMemo
// useCallback -> function doesn't occupy new memory
// Lazy loading -> load only when necessary
// Virtu
