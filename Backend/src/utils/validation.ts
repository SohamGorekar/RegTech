import { z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string().min(1, 'Password is required')
});

// Create project validation schema (NEW)
export const createProjectSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters').trim(),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters').trim(),
  sector: z.string().min(1, 'Sector is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  structure: z.string().min(1, 'Legal structure is required'),
  teamSize: z.number().min(1, 'Team size must be at least 1').max(10000, 'Team size seems too large')
});

// Type for validation result
type ValidationResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// Validation helper
export const validate = <T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): ValidationResult<T> => {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    const firstError = result.error.issues[0];
    return { 
      success: false, 
      error: firstError?.message || 'Validation failed'
    };
  }
};