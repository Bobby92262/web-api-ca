import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  return (
    <Grid container spacing={2}>
      {props.movies.map((m) => (
      <Grid key={m.id} 
      size={{xs: 12, sm: 12, md: 4, lg: 4, xl: 4}} 
      sx={{padding: "20px"}}>
      <Movie movie={m} action={props.action}/>
    </Grid>
  ))}
  </Grid>
  );
};

export default MovieList;
