import {Dialog, DialogTitle, DialogContent, Typography, Box } from "@mui/material";
import usePersonImages from "../../hooks/usePersonImages";
import usePersonDetails from "../../hooks/usePersonDetails";

const ActorPopUp = ({ actor, onClose }) => {
    const {data: images, isPending } = usePersonImages(actor.id);
    const {data: details, isPending: detailsPending } = usePersonDetails(actor.id); 

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{actor.name}</DialogTitle>
            <DialogContent
                sx={{
                    backgroundColor: "background.paper",
                    color: "text.primary",
                    padding: "3",
                }}>
                {detailsPending ? (
                    <Typography>Loading biography...</Typography>
                ) : details?.biography ? (
                    <Typography variant="body2" sx={{ marginBottom: 2}}>
                        {details.biography}
                    </Typography>
                ) : (
                    <Typography> No biography available.</Typography>
                )}
                
                {isPending ? (
                    <Typography>Loading images...</Typography>
                ) : images?.profiles?.length? (
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {images.profiles.slice(0, 3).map((img, i) => (
                            <img
                                key={i}
                                src={`https://image.tmdb.org/t/p/w300/${img.file_path}`}
                                alt={'Profile ${i}'}
                                style={{ width: "150px", borderRadius: "8px" }}
                                />
                        ))}

                    </Box>
                ) : (
                    <Typography>No images available</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ActorPopUp
