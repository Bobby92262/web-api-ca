import React from "react";
import Box from "@mui/material/Box";
import MovieCard from "../movieCard";

const FavouritesPreview = ({ movies }) => {
    if (movies.length === 0) {
        return <p>You have no favourite movies yet.</p>
    }

    return (
        <Box sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
        }}
        >
            {movies.map((movie) => (
                <Box key={movie.id} sx={{ minWidth: "200px" }}>
                    <MovieCard movie={movie} />
                </Box>
            ))}
        </Box>
    );
};

export default FavouritesPreview;