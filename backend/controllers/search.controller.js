
import User from "../models/user.js";
import { fetchFromTMDB } from "../services/tmdb.services.js"

export const searchPerson = async (req, res) => {
    try {
        const { query } = req.params;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
        
        if (!data || !data.results) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch data from TMDB"
            });
        }

        if (data.results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No results found"
            });
        }
     
        
        // Check if user is authenticated before updating history
        if (req.user && req.user._id) {
            try {
                await User.findByIdAndUpdate(req.user._id,
                     {
                    $push: { 
                        searchHistory: {
                            id: data.results[0].id,
                            image: data.results[0].profile_path,
                            title: data.results[0].name,
                            searchtype: "person",
                            date: new Date()
                        }
                    }
                }
            );
            
            } catch (historyError) {
                console.error("Failed to update search history:", historyError);
                // Continue with the response even if history update fails
            }
        }

        res.status(200).json({
            success: true,
            trailers: data.results
        });

    } catch (error) {
        console.error("Search person error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to perform search",
            error: error.message
        });
    }
}

export const searchMovies = async (req, res) => {
    try {
        const { query } = req.params;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
        
        if (!data || !data.results) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch data from TMDB"
            });
        }

        if (data.results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No results found"
            });
        }
        
        // Check if user is authenticated before updating history
        if (req.user && req.user._id) {
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $push: { 
                        searchHistory: {
                            id: data.results[0].id,
                            image: data.results[0].poster_path,
                            title: data.results[0].title,
                            searchtype: "movie",
                            date: new Date()
                        }
                    }
                });
            } catch (historyError) {
                console.error("Failed to update search history:", historyError);
                // Continue with the response even if history update fails
            }
        }

        res.status(200).json({
            success: true,
            trailers: data.results
        });

    } catch (error) {
        console.error("Search movies error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to perform search",
            error: error.message
        });
    }
}

export const searchTv = async (req, res) => {
    try {
        const { query } = req.params;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
        
        if (!data || !data.results) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch data from TMDB"
            });
        }

        if (data.results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No results found"
            });
        }
        
        
        // Check if user is authenticated before updating history
        if (req.user && req.user._id) {
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $push: { 
                        searchHistory: {
                            id: data.results[0].id,
                            image: data.results[0].poster_path,
                            title: data.results[0].name,
                            searchtype: "tv",
                            date: new Date()
                        }
                    }
                });
            } catch (historyError) {
                console.error("Failed to update search history:", historyError);
                // Continue with the response even if history update fails
            }
        }

        res.status(200).json({
            success: true,
            trailers: data.results
        });

    } catch (error) {
        console.error("Search TV error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to perform search",
            error: error.message
        });
    }
}

export const getsearchHistory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        
        res.status(200).json({
            success: true,
            history: req.user.searchHistory || []
        });
    } catch (error) {
        console.error("Get search history error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch search history",
            error: error.message
        });
    }
}

export const removeitemfromSearchHistory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        
        let { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Item ID is required"
            });
        }

        id = parseInt(id);

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { searchHistory: { id: id } }
        });
        
        res.status(200).json({
            success: true,
            message: "Item removed from search history"
        });
    } catch (error) {
        console.error("Remove search history item error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove item from search history",
            error: error.message
        });
    }
}