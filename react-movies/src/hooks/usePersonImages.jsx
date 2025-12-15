import { useQuery } from "@tanstack/react-query";
import { getPersonImages } from "../api/tmdb-api";

const usePersonImages = (personId) => {
    return useQuery({
        queryKey: ["personImages", {id : personId}],
        queryFn: getPersonImages,
        enabled: !!personId, //Only fetch if id is valid check
    });
};

export default usePersonImages;