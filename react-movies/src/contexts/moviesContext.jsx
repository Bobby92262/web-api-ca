import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
const [favorites, setFavorites] = useState( [] )
const [myReviews, setMyReviews] = useState( {} ) 
const [watchlist, setWatchList] = useState( [] )
const [watched, setWatched] = useState([])


  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

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
  }
  
  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
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
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        watchlist,
        addToWatchList,
        addToWatched,
        removeFromWatchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
