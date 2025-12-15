import { useEffect, useState } from "react";
import {getSimilar} from '../api/tmdb-api'
import { useQuery } from "@tanstack/react-query";

const useSimilarMovies = (movieId, enabled = false) => {
  return useQuery({
    queryKey: ["similar", { id: movieId }],
    queryFn: getSimilar,
    enabled
  });
};

export default useSimilarMovies;