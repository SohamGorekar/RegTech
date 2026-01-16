import express from 'express';
import { 
  createProject, 
  getUserProjects, 
  getProjectById, 
  deleteProject,
  getProjectRoadmap,
  updateTaskStatus
} from '../controllers/projectController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// All project routes require authentication
router.use(authMiddleware);

// Create a new project
router.post('/', createProject);

// Get all projects for the authenticated user
router.get('/', getUserProjects);

// Get a single project by ID
router.get('/:projectId', getProjectById);

// Get roadmap data for a project (NEW)
router.get('/:projectId/roadmap', getProjectRoadmap);

// Update task status (NEW)
router.patch('/:projectId/tasks/:taskId/status', updateTaskStatus);

// Delete a project
router.delete('/:projectId', deleteProject);

export default router;