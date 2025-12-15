import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../api/tmdb-api";

const usePersonDetails = (personId) => {
    return useQuery({
        queryKey: ["personDetails", {id : personId}],
        queryFn: getPersonDetails,
        enabled: !!personId, //Only fetch if id is valid check
    });
};

export default usePersonDetails;