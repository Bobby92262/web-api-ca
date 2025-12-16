import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Box } from "@mui/material";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, userName, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuOptions = isAuthenticated 
  ? [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Movies", path: "/movies/trending" },
    { label: "Watched Movies", path: "/movies/watched" },
    { label: "Top Rated Movies", path: "/movies/top_rated" },
    { label: "Profile", path: "/profile"},
    ]
  : [
    { label: "Home", path: "/"},
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Movies", path: "/movies/trending" },
    { label: "Top Rated Movies", path: "/movies/top_rated" },
    ];
    
  

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };



  return (
    <>
      <AppBar position="fixed" sx={{ background: "linear-gradient(90deg, #ff6f00 0%, #ff5722 100%)",}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1}}>
            <Typography variant="h4">
              TMDB Client
            </Typography>
            <Typography variant="h6">
              All you ever wanted to know about Movies!
            </Typography>
          </Box>

            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {isAuthenticated ? (
                <>
                  <Typography sx={{ 
                      backgroundColor: "#1f2a44",
                      color: "#ffffffff",
                      paddingX: 1,
                      paddingY: 0.5,
                      borderRadius: 1,
                      fontWeight: "bold",
                      marginRight: 1
                    }}>
                    Welcome {userName}
                  </Typography>

                  <Button color="inherit" onClick={signout}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/signup")}>
                    Signup
                  </Button>
                </>
              )}
            </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
