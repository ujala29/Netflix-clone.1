import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  });
  // console.log("Token generated:", token); // Debugging line to check the token
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production' // Secure cookie in production
  });
  
  // return token;
};
