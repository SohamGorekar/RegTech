import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import { validate, signupSchema, loginSchema } from '../utils/validation';
import { generateToken } from '../utils/jwt';
import { AuthResponse, User } from '../types';

const SALT_ROUNDS = 10;

// Signup Controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validation = validate(signupSchema, req.body);
    
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: validation.error
      } as AuthResponse);
      return;
    }

    const { name, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      } as AuthResponse);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    // Generate JWT token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email
    });

    res.status(201).json({
      success: true,
      token,
      user: newUser
    } as AuthResponse);

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred during signup'
    } as AuthResponse);
  }
};

// Login Controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validation = validate(loginSchema, req.body);
    
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: validation.error
      } as AuthResponse);
      return;
    }

    const { email, password } = validation.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      } as AuthResponse);
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      } as AuthResponse);
      return;
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    // Return user without password
    const userResponse: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    res.status(200).json({
      success: true,
      token,
      user: userResponse
    } as AuthResponse);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred during login'
    } as AuthResponse);
  }
};

// Get current user (protected route)
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user data'
    });
  }
};