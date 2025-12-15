import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        background:{
            default: "#0a192f",
            paper: "#1f2a44",
        },
        primary:{
            main: "#ff5722",
            contrastText: "#ffffff",
        },
        secondary:{
            main: "#ff6f00",
            contrastText: "#ffffff",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0bec5",
        },
    },
    typography: {
    h4: {
      fontWeight: 600,
      color: "#ffffff",  
    },
    button: {
        textTransform: "none",
    },
},
});

export default theme