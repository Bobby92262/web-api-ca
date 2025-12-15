// Dictate by ratings, so will need api for ratings  or just filtering ?
// Based on trendingMoviesPAge

import React from "react";
import { getMovies, getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchlistIcon from "../components/cardIcons/addToWatchList";


const TopRatedMoviesPage = () => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['toprated'],
    queryFn: getTopRatedMovies,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={[
        (movie) => <AddToFavoritesIcon movie={movie} />,
        (movie) => <AddToWatchlistIcon movie={movie}/>,
      ]}
    />
  );

};

export default TopRatedMoviesPage;