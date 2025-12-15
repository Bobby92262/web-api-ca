import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery} from "@tanstack/react-query";
import { getUpcoming } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToWatchlistIcon from "../components/cardIcons/addToWatchList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";



const UpcomingMoviesPage = () => {
 
// useQuery fetches data and manages loading/error states
const { data, error, isPending, isError  } = useQuery({
      queryKey: ['upcoming'], //Unique key for caching and tracking
      queryFn: getUpcoming, // Function that performs the fetch
  });

  //Show spinner while data is loading
  if (isPending) {
    return <Spinner />;
  }

  //Extract movie list from API response
  // Add fallback for genre_ids to ensure filtering
  const movies = data.results.map((movie) => ({
    ...movie,
  }));

  return (
    //Render the movie list using reusable template
    <PageTemplate
      title="Upcoming Movies" //Page HEader
      movies={movies}         // Movie data to display
      action={[
        (movie) => <AddToFavoritesIcon movie={movie}/>,
      ]}
    />
  );
};

export default UpcomingMoviesPage;