import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import { Box, Button } from "@mui/material";
import { Link } from "react-router";
import MovieIcon from "@mui/icons-material/Movie";


const TemplateMoviePage = ({ movie, children }) => {
 
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters 


  return (
    <>
      <MovieHeader movie={movie} />
      <Grid container spacing={5} style={{ padding: "15px", p: 2 }}>
        <Grid size={{xs: 3}}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}>
            <ImageList
                sx={{
                    maxHeight: 480,
                    overflowY: "auto",
                }}
                cols={1}
            >
                {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                        style={{width: "100%", display: "block" }}
                    />
                    </ImageListItem>
                ))}
            </ImageList>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
              <Link to={`/movies/${movie.id}/similar`} style={{ textDecoration: "none", width: "100%" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<MovieIcon />}
                  sx={{ borderRadius: 2 }}
                  >
                    Show Similar Movies
                  </Button>
                </Link>
            </Box>
          </Box>
        </Grid>

        <Grid size={{xs: 9}}>
          <div>{children}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;