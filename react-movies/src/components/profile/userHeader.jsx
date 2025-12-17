import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const UserHeader = ({ username }) => {
    const initials = username ? username.charAt(0).toUpperCase() : "?";

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                {initials}
            </Avatar>

            <Box>
                <Typography variant="h4">{username}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Welcome Back
                </Typography>
            </Box>
        </Box>
    )
};

export default UserHeader;