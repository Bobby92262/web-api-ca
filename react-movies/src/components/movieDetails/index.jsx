import React, {useState} from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner';
import { Box } from "@mui/material";
import ActorPopUp from "../actorPopUp/actorPopUp";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);
const [selectedActor, setSelectedActor] = useState(null);

 const {data: credits, isPending, isError, error} = useQuery ({
    queryKey: ['credits',{id:movie.id}],
    queryFn: getMovieCredits,
  });

   if (isPending) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    } 


  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3" sx={{marginTop: 4 }}>
        Cast
      </Typography>
      {isPending ? (
        <Spinner />
      ) : isError ? (
        <Typography color="error">Failed to load cast</Typography>
      ) : credits?.cast?.length? (
      <Paper component="ul" sx={{...root}}>
        <li>
          <Chip label="Cast" sx={{...chip}} color="primary" />
        </li>
        {credits.cast.slice(0 , 10).map((actor) => (
          <Box key={actor.id} sx ={{ textAlign: "center", width: 120, cursor: "pointer" }} onClick={() => setSelectedActor(actor)} >
            <img
              src={
                actor.profile_path
                ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                : "/default-avatar.png"
              }
              alt={actor.name}
              style={{ borderRadius: "8px", width: "100%"}}
              />
              <Typography variant="body2" sx={{ fontWeight: "bold", mt:1 }}>
                {actor.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {actor.character}
              </Typography>
          </Box>
        ))}
        {selectedActor && (
          <ActorPopUp actor={selectedActor} onClose={() => setSelectedActor(null)} />
        )}
      </Paper>
      ) : (
        <Typography>No cast data available</Typography>
      )}

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;
