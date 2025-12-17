import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProfileCard = ({ title, count, icon, onClick }) => {
    return (
        <Card elevation={3}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {icon}
                        <Box>
                            <Typography variant="h6">{title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {count} items
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProfileCard