import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchlistIcon = ({ movie }) => {
  const {addToWatchList, addToWatched} = useContext(MoviesContext);

  const handleAddToWatchList = (e) => {
    e.preventDefault();
    addToWatchList(movie);
    addToWatched(movie);
  };

  return (
    <IconButton aria-label="add to watch list" onClick={handleAddToWatchList} >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;