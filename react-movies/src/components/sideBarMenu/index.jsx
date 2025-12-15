import React from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router";
import theme from "../../theme";

const menuOptions = [
{ label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Movies", path: "/movies/trending" },
    { label: "Watched Movies", path: "/movies/watched" },
    { label: "Top Rated Movies", path: "/movies/top_rated" },
    { label: "Login", path: "login" }
];

const SideBarMenu = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "75%",
            }}
            >
                {menuOptions.map((choice) => (
                    <Button
                    key={choice.label}
                    component={NavLink}
                    to={choice.path}
                    end={choice.path === "/"}
                    color="primary"
                    variant="outlined"
                    sx={({ isActive }) => ({
                        textTransform: "none",
                        borderColor: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                        fontWeight: isActive ? "bold" : "normal",
                        backgroundColor: isActive ? theme.palette.action.hover : "transparent",
                    })}
                    >
                        {choice.label}
                    </Button>
                ))}
            </Box>
    );
};

export default SideBarMenu;