import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateCookies } from '../utils/genratecookies.js'; 
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }
    if (!email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Email is not valid' });
    }

    // Check for existing users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash password and save user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    generateCookies(newUser._id, res); // Generate JWT token and set it as a cookie
    // Save the user to the database
// newUser._id this is the id of new user just store in mongodb
    await newUser.save();  // Save the new user to the database

    const userResponse = { ...newUser._doc };
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Error during signup:', error.message || error); // Log the error message
    // Return a 500 status code with an error message
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

// Empty login and logout stubs
export async function login(req, res) {
     try {
      const { email, password } = req.body;
      if(!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      // Generate JWT token and set it as a cookie  
      generateCookies(user._id, res); // Generate JWT token and set it as a cookie
      // Send response
      const userResponse = { ...user._doc };
      delete userResponse.password;
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: userResponse
      });
     } catch (error) {
       console.error('Error during login:', error.message || error);
       return res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message
       });
      
     }
}

export async function logout(req, res) {
  // TODO: implement logout
  try {
    res.clearCookie('jwt-netflix'); // Clear the cookie
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
     // Log the logout event
  
  } catch (error) {
    console.error('Error during logout:', error.message || error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
    
  }
}

export async function authCheck(req, res) { 
  try {
    
     res.status(200).json({ success: true, message: 'User is authenticated', user: req.user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'AuthCeck error',
      error: error.message
    });
  }
}