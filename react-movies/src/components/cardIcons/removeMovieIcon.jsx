import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveMovieIcon = ({ movie }) => {
  const { removeFromWatchlist } = useContext(MoviesContext);

  const handleRemove = (e) => {
    e.preventDefault();
    removeFromWatchlist(movie);
  };
  return (
    <IconButton
      aria-label="remove movie"
      onClick={handleRemove}
    >
      <RemoveCircleIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveMovieIcon;