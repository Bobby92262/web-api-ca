import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Navigate, useNavigate } from "react-router";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getReviewsByUser } from "../api/Helper-index";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import UserHeader from "../components/profile/UserHeader";
import ProfileCard from "../components/profile/ProfileCard";
import FavouritesPreview from "../components/profile/favouritesPreview";

import FavoriteIcon from "@mui/icons-material/Favorite";
import RateReviewIcon from "@mui/icons-material/RateReview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getMovie } from "../api/tmdb-api";

const ProfilePage = () => {
    const auth = useContext(AuthContext);
    const { favourites = [], watched = [] } = useContext(MoviesContext);
    const navigate = useNavigate();

    console.log("WATCHED:", watched);
    console.log("FAVOURITES:", favourites);


    const favouriteMovieQueries = useQueries({
        queries: favourites.map((id) => ({
            queryKey: ["movie", { id }],
            queryFn: getMovie,
        })),
    });

    const favouriteMovies = favouriteMovieQueries.filter((q) => q.data).map((q) => q.data);

    // Get Review from the backend
    const { data: userReviews = [] } = useQuery({
        queryKey: ["userReviews", { username: auth.userName }],
        queryFn: getReviewsByUser,
        enabled: !!auth.userName,
    });
  
    return  !auth.isAuthenticated ? (
        <Navigate to="/login" />
    ) : (
        <Box sx={{
            backgroundColor: "background.default",
            minHeight: "100vh",
            padding: 3,
        }}
        >
            <Box sx={{ backgroundColor: "background.default", maxWidth: "1200px", margin: "0 auto", padding: 3 }}>
                <UserHeader username={auth.userName} />

                <Grid container spacing={3} sx={{ mt: 2}}>
                    <Grid size = {{ xs:12, sm:6, md:4 }}>
                        <ProfileCard
                        title="Favourite Movies"
                        count={favourites.length}
                        icon={<FavoriteIcon fontSize="large" color="error" />}
                        onClick={() => navigate("/movies/favorites")}
                        />
                    </Grid>

                    <Grid size = {{ xs:12, sm:6, md:4 }}>
                        <ProfileCard
                        title="My Reviews"
                        count={userReviews.length}
                        icon={<RateReviewIcon fontSize="large" color="primary" />}
                        onClick={() => navigate("/profile/reviews")}
                        />
                    </Grid>

                    <Grid size = {{ xs:12, sm:6, md:4 }}>
                        <ProfileCard
                        title="Watched Movies"
                        count={watched.length}
                        icon={<VisibilityIcon fontSize="large" color="action" />}
                        onClick={() => navigate("/movies/watched")}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt:5 }}>
                    <Typography variant="h5" sx={{ mb:2 }} color="primary">
                        Your Favourite Movies
                    </Typography>
                    <FavouritesPreview movies={favouriteMovies} />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;

