import express from 'express';
import User from "../users/userModel.js";
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';



const router = express.Router(); // eslint-disable-line

// Get favourites
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.findByUserName(req.user.username);
    res.status(200).json(users.favourites || []);
    })
);

// Add favourites
router.post('/', asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    const user = await User.findByUserName(req.user.username);
     
    if(!user.favourites.includes(movieId)) {
        user.favourites.push(movieId);
        await user.save();
    }
    res.status(200).json(user.favourites);
    })
);

//Delete favourite
router.delete(
    "/:movieId", asyncHandler(async(req, res) => {
        const {movieId } = req.params;
        const user = await User.findByUserName(req.user.username);

        user.favourites = user.favourites.filter(
            (id) => id !== Number(movieId)
        );
        await user.save();

        res.status(200).json(user.favourites);
    })
);

export default router;