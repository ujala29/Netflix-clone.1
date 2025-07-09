

import { fetchFromTMDB } from "../services/tmdb.services.js"

export async function getTrendingmovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randommovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({
            success: true,
            content: randommovie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export const getmovieTrailer = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.json({
            success: true,
            trailers: data.results
        })

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.send(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}


export const getmovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.json({
            success: true,
            content: data
        })

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.send(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}




export const getsimilarmovies = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.json({
            success: true,
            content: data.results
        })

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.send(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
export const getmoviescategory = async (req, res) => {
    const { cateorgy } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${cateorgy}?language=en-US&page=1`)
        res.json({
            success: true,
            content: data.results
        })

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.send(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
} 
