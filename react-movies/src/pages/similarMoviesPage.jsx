// Dictate by ratings, so will need api for ratings  or just filtering ?
// Based on trendingMoviesPAge

import React from "react";
import { getMovies, getSimilar } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { useParams } from "react-router";


const SimilarMoviesPage = () => {

const { id } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['similar', { id }],
    queryFn: getSimilar,
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
      title="Similar Movies"
      movies={movies}
      action={[
        (movie) => <AddToFavoritesIcon movie={movie} />
      ]}
    />
  );

};

export default SimilarMoviesPage;