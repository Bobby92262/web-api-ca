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
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import StartPage from "./pages/startPage";
import ProfilePage from "./pages/profilePage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";
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

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <AuthContextProvider>
          <MoviesContextProvider>
            <Box sx={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          
            <SiteHeader />
            
              <Routes>
                
                <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage/> } />
                <Route path="/movies/trending" element={<TrendingMoviesPage/>} />
                <Route path="/movies/top_rated" element={<TopRatedMoviesPage/>} />
                <Route path="/movies/:id/similar" element={<SimilarMoviesPage/>} />
                <Route path="/login" element={< LoginPage />} />
                <Route path="/signup" element={< SignupPage />} />
                <Route path="/profile" element={< ProfilePage />} />  
                
                
                <Route element={<ProtectedRoutes />}>
                  <Route path="/start" element={< StartPage />} />
                  <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                  <Route path="/movies/watched" element={<WatchedMoviesPage/>} />
                  <Route path="/profile" element={< ProfilePage />} />
                </Route>

                
                <Route path="*" element={ <Navigate to="/" /> } />
              </Routes>
              </Box>
            </MoviesContextProvider>
            </AuthContextProvider>
          </BrowserRouter>
        
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
