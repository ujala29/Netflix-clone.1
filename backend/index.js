import express from 'express'; // import used for emascript modules
import cookiesParser from 'cookie-parser'; // Import the cookie parser

import cors from 'cors';

import authrouter from './routes/auth.routes.js';

import authmovie from './routes/movies.routes.js'; // Import the 
// movie router
import authtv from './routes/tv.routes.js'; // Import the
// tv router
import authsearch from './routes/search.routes.js'; // Import the
import connectDB from './models/db.js'; // Import the database connection
import { protectRoutes } from './middleware/protectRoutes.js';
const app = express();


const port = 3000;
import dotenv from 'dotenv';
dotenv.config();

// Middlewares
app.use(cors({
  origin: 'https://netflix-clone-1-1.onrender.com', // your frontend URL
  credentials: true, // allow cookies if you're using them
}));
app.use(express.json());


app.use(cookiesParser()); // Use cookie parser middleware

connectDB();



app.use('/api/v1/auth',authrouter);
app.use('/api/v1/movie',protectRoutes ,authmovie);
app.use('/api/v1/tv', protectRoutes ,authtv);
app.use('/api/v1/search', protectRoutes ,authsearch);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || port}`);
});
