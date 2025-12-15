// PAge should be a list of movies user has watched, check this as watched.
// Is there a way to remove watched movies, or tag them as watched ? on other pages?
// Modelled on gavourites movies Page

import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import RemoveMovieIcon from "../components/cardIcons/removeMovieIcon";


const WatchedMoviesPage = () => {
  const {watchlist: movieIds = [] } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchedMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
    }))
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = watchedMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  // This probably needs updating
  // Empty array initialy to mitigate errors
  const movies = watchedMovieQueries
  .filter((q) => q.data) // only include successful fetches
  .map((q) => ({
    ...q.data,
    genre_ids: q.data.genres?.map((g) => g.id) || [],
  }));


  const toDo = () => true;

  return (
    <PageTemplate
      title="Watched Movies"
      movies={movies}
      action={[
        (movie) => <WriteReview movie={movie}/>,
        (movie) => <RemoveMovieIcon movie={movie}/>
      ]}
    />
  );
};

export default WatchedMoviesPage;
