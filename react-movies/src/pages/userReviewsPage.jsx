import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getReviewsByUser } from "../api/Helper-index";
import { getMovie } from "../api/tmdb-api";
import { AuthContext } from "../contexts/authContext"
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MyReviewsPage = () => {
    const auth  = useContext(AuthContext);
    const navigate = useNavigate();

    // Fetch reviews by user
    const { data: userReviews = [] } = useQuery({
        queryKey: ["userReviews", { username: auth.userName }],
        queryFn: getReviewsByUser,
        enabled: !!auth.userName,
    });


    // Retrieve the movie id
    const movieIds = userReviews.map((r) => r.movieId);

    // Fetch movie details for each review
    const movieQueries = useQueries({
        queries: movieIds.map((id) => ({
            queryKey: ["movie", { id }],
            queryFn: getMovie,
        })),
    });

    // combine reviews + movies
    const combined = userReviews.map((review, index) => ({
        review,
        movie: movieQueries[index]?.data,
    }));

    return (
        <Box
            sx={{
                backgroundColor: "background.default",
                minHeight: "100vh",
                padding: 3,
            }}
        >
            <Typography variant="h4" sx={{ mb: 3 }}>
                My Reviews
            </Typography>

            <List>
                {combined.map(({ review, movie }) => {
                    console.log("MOVIE:", movie);

                    return (
                    <ListItem
                        key={review.id}
                        button
                        onClick={() => navigate(`/movies/${review.movieId}`)}
                        secondaryAction={<ChevronRightIcon />}
                        sx={{
                        backgroundColor: "background.paper",
                        borderRadius: 2,
                        mb: 2,
                        }}
                    >
                        <ListItemAvatar>
                        <Avatar
                            variant="rounded"
                            src={
                            movie?.poster_path
                                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                : ""
                            }
                            sx={{ width: 60, height: 90 }}
                        />
                        </ListItemAvatar>

                        <ListItemText
                        primary={
                            <Typography variant="h6" color="text.primary">
                            {movie?.title || "Loading..."}
                            </Typography>
                        }
                        secondary={
                            <>
                            <Typography variant="body2" color="text.secondary">
                                Rating: {review.rating}/5
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {review.content.length > 100
                                ? review.content.slice(0, 100) + "..."
                                : review.content}
                            </Typography>
                            </>
                        }
                        />
                    </ListItem>
                    );
                })}
                </List>

        </Box>
    );
};

export default MyReviewsPage;