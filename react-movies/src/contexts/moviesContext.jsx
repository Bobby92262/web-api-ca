import React, { useState } from "react";
import { createContext } from "react";
import { fetchUserFavourites, saveFavouriteMovie, deleteFavouriteMovie } from "../api/Helper-index";
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

export const MoviesContext = createContext(null);

const MoviesContextProvider = (props) => {
  const queryClient = useQueryClient();

  // Backend Favourites
  const{ data: favouriteMovieIds = [] } = useQuery({
    queryKey: ["favouriteMovies"],
    queryFn: fetchUserFavourites
  });

  const addFavouriteMutation = useMutation({
    mutationFn: saveFavouriteMovie,
    onSuccess: () => queryClient.invalidateQueries(["favouriteMovies"])
  });

  const removeFavouriteMutation = useMutation({
    mutationFn: deleteFavouriteMovie,
    onSuccess: () => queryClient.invalidateQueries(["favouriteMovies"])
  });

  const addToFavourites = (movie) =>
    addFavouriteMutation.mutate(movie.id);

  const removeFromFavourites = (movie) =>
    removeFavouriteMutation.mutate(movie.id);

  //Removed favourite prop

  const [myReviews, setMyReviews] = useState( {} );
  const [watchlist, setWatchList] = useState( [] );
  const [watched, setWatched] = useState([]);


  const addToWatchList = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)){
      const newWatchList = [...watchlist, movie.id];
      setWatchList(newWatchList)
      console.log("Updated watchlist:", newWatchList);
  } else {
    console.log("Movie already in watchlist:",watchlist);
  }
};

  const addToWatched = (movie) => {
    if (!watched.includes(movie.id)) {
      setWatched([...watched, movie.id]);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchList((prev) => prev.filter((id) => id !== movie.id));
    setWatched((previous) => previous.filter((id) => id !== movie.id));
  };

  
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);


  return (
    <MoviesContext.Provider
      value={{
        //Backend favourites
        favourites: favouriteMovieIds,
        addToFavourites,
        removeFromFavourites,
        //Still local
        addReview,
        watchlist,
        addToWatchList,
        addToWatched,
        removeFromWatchlist,
        watched,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
