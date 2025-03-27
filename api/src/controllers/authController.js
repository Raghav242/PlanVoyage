import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';


// Register User
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if username or email is already taken
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already taken.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration Error:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

// Login User
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Both username and password are required.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};


// Logout User
export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully.' });
  
};


// Fetch Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};



// Get Logged-in User Data
export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, email: true }, // Exclude password
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

