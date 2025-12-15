import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import WatchedMoviesPage from "./pages/watchedMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedPage";
import SimilarMoviesPage from "./pages/similarMoviesPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Box } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box sx={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <BrowserRouter>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage/> } />
                <Route path="/movies/trending" element={<TrendingMoviesPage/>} />
                <Route path="/movies/watched" element={<WatchedMoviesPage/>} />
                <Route path="/movies/top_rated" element={<TopRatedMoviesPage/>} />
                <Route path="/movies/:id/similar" element={<SimilarMoviesPage/>} />
                <Route path="*" element={ <Navigate to="/" /> } />
              </Routes>
            </MoviesContextProvider>
          </BrowserRouter>
        </Box>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

//Update