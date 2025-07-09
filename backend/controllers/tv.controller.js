

import { fetchFromTMDB } from "../services/tmdb.services.js"

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomtv = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({
            success: true,
            content: randomtv
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export const getTvTrailer = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
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


export const getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
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




export const getsimilarTv = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
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
export const getTvcategory = async (req, res) => {
    const { cateorgy } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${cateorgy}?language=en-US&page=1`)
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