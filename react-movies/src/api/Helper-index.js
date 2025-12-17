export const fetchUserFavourites = async () => {
    const response = await fetch("http://localhost:8080/api/favourites", {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });
    return response.json(); //Return the array of movieIds
};

export const saveFavouriteMovie = async (movieId) => {
    const response = await fetch("http://localhost:8080/api/favourites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({movieId})
    });
    return response.json();
};

export const deleteFavouriteMovie = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/favourites/${movieId}`, {
        method: "DELETE",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });
    return response.json();
};

export const postReview = async (movieId, content, rating) => {
  const response = await fetch("http://localhost:8080/api/reviews", {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({ movieId, content, rating })
  });
  return response.json();
};

export const getReviewsByMovie = async ({ queryKey }) => {
    const [, {movieId }] = queryKey;
    const response = await fetch(`http://localhost:8080/api/reviews/movie/${movieId}`
    );
    return response.json();
};

export const getReviewsByUser = async ({ queryKey }) => {
    const [, { username }] = queryKey;
    const response = await fetch(`http://localhost:8080/api/reviews/user/${username}`
    );
    return response.json();
};