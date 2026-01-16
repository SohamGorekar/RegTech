import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { ProjectListItem, ProjectsResponse } from '../types';
import { validate, createProjectSchema } from '../utils/validation';
import { generateDummyRoadmap } from '../utils/dummyRoadmap';
import { generateRoadmapWithGemini } from '../services/geminiService';

// Helper function to format legal structure
const formatLegalStructure = (structure: string): string => {
  const mapping: Record<string, string> = {
    'pvtltd': 'Pvt Ltd',
    'llp': 'LLP',
    'proprietorship': 'Proprietorship',
    'partnership': 'Partnership',
    'opc': 'OPC'
  };
  return mapping[structure.toLowerCase()] || structure;
};

// Helper function to capitalize city/state
const capitalizeLocation = (location: string): string => {
  return location
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Helper function to count total tasks in roadmap
const countTotalTasks = (roadmapData: any): number => {
  if (!roadmapData || !Array.isArray(roadmapData)) return 0;
  return roadmapData.reduce((total: number, category: any) => {
    return total + (category.tasks ? category.tasks.length : 0);
  }, 0);
};

// Create a new project (NEW - FOR ONBOARDING)
// export const createProject = async (req: Request, res: Response): Promise<void> => {
//   try {
//     if (!req.user) {
//       res.status(401).json({
//         success: false,
//         error: 'Unauthorized'
//       });
//       return;
//     }

//     // Validate request body
//     const validation = validate(createProjectSchema, req.body);
    
//     if (!validation.success) {
//       res.status(400).json({
//         success: false,
//         error: validation.error
//       });
//       return;
//     }

//     const { projectName, projectDescription, sector, state, city, structure, teamSize } = validation.data;

//     // Generate dummy roadmap (will be replaced with Gemini API call later)
//     const roadmapData = generateDummyRoadmap(sector, structure);
//     const totalTasks = countTotalTasks(roadmapData);

//     // Create project in database
//     const newProject = await prisma.project.create({
//       data: {
//         userId: req.user.userId,
//         name: projectName,
//         description: projectDescription,
//         domain: sector,
//         locationCity: city.toLowerCase(),
//         locationState: state.toUpperCase(),
//         legalStructure: structure.toLowerCase(),
//         teamSize: teamSize,
//         completedCount: 0,
//         totalCount: totalTasks,
//         roadmapData: roadmapData
//       }
//     });

//     res.status(201).json({
//       success: true,
//       project: {
//         id: newProject.id,
//         name: newProject.name,
//         description: newProject.description,
//         sector: newProject.domain,
//         location: `${capitalizeLocation(newProject.locationCity)}, ${newProject.locationState}`,
//         structure: formatLegalStructure(newProject.legalStructure),
//         progress: 0,
//         totalTasks: newProject.totalCount,
//         completedTasks: 0,
//         createdAt: newProject.createdAt.toISOString().split('T')[0]
//       },
//       message: 'Project created successfully'
//     });

//   } catch (error) {
//     console.error('Create project error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to create project'
//     });
//   }
// };



// Create a new project with AI-generated roadmap
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
      return;
    }

    // Validate request body
    const validation = validate(createProjectSchema, req.body);
    
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: validation.error
      });
      return;
    }

    const { projectName, projectDescription, sector, state, city, structure, teamSize } = validation.data;

    console.log(`🚀 Creating project: ${projectName}`);

    // Generate AI roadmap using Gemini
    let roadmapData;
    let generationMethod = 'ai';

    try {
      roadmapData = await generateRoadmapWithGemini({
        projectName,
        projectDescription,
        sector,
        state,
        city,
        structure,
        teamSize
      });
      console.log('✅ Used Gemini AI for roadmap generation');
    } catch (geminiError: any) {
      console.error('⚠️ Gemini generation failed, using dummy data:', geminiError.message);
      // Fallback to dummy data if Gemini fails
      roadmapData = generateDummyRoadmap(sector, structure);
      generationMethod = 'dummy';
    }

    const totalTasks = countTotalTasks(roadmapData);

    console.log(`📊 Total tasks counted: ${totalTasks}`);

    // Create project in database with roadmap data saved in JSONB column
    const newProject = await prisma.project.create({
      data: {
        userId: req.user.userId,
        name: projectName,
        description: projectDescription,
        domain: sector,
        locationCity: city.toLowerCase(),
        locationState: state.toUpperCase(),
        legalStructure: structure.toLowerCase(),
        teamSize: teamSize,
        completedCount: 0,
        totalCount: totalTasks,
        roadmapData: roadmapData // Saved as JSONB in PostgreSQL
      }
    });

    console.log(`✅ Project created in database with ID: ${newProject.id}`);

    res.status(201).json({
      success: true,
      project: {
        id: newProject.id,
        name: newProject.name,
        description: newProject.description,
        sector: newProject.domain,
        location: `${capitalizeLocation(newProject.locationCity)}, ${newProject.locationState}`,
        structure: formatLegalStructure(newProject.legalStructure),
        progress: 0,
        totalTasks: newProject.totalCount,
        completedTasks: 0,
        createdAt: newProject.createdAt.toISOString().split('T')[0]
      },
      message: `Project created successfully with ${generationMethod === 'ai' ? 'AI-generated' : 'template'} roadmap`
    });

  } catch (error) {
    console.error('❌ Create project error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
};

// Get all projects for the authenticated user
export const getUserProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      } as ProjectsResponse);
      return;
    }

    // Fetch all projects for the user
    const projects = await prisma.project.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        description: true,
        domain: true,
        locationCity: true,
        locationState: true,
        legalStructure: true,
        completedCount: true,
        totalCount: true,
        createdAt: true
      }
    });

    // Format projects for frontend
    const formattedProjects: ProjectListItem[] = projects.map(project => {
      const progress = project.totalCount > 0 
        ? Math.round((project.completedCount / project.totalCount) * 100)
        : 0;

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        sector: project.domain,
        location: `${capitalizeLocation(project.locationCity)}, ${project.locationState.toUpperCase()}`,
        structure: formatLegalStructure(project.legalStructure),
        progress,
        totalTasks: project.totalCount,
        completedTasks: project.completedCount,
        createdAt: project.createdAt.toISOString().split('T')[0]
      };
    });

    // Calculate stats
    const stats = {
      totalProjects: projects.length,
      totalTasksCompleted: projects.reduce((sum, p) => sum + p.completedCount, 0),
      totalTasks: projects.reduce((sum, p) => sum + p.totalCount, 0)
    };

    res.status(200).json({
      success: true,
      projects: formattedProjects,
      stats
    } as ProjectsResponse);

  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    } as ProjectsResponse);
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
      return;
    }

    const projectId = req.params.projectId as string;

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.userId // Ensure user owns this project
      }
    });

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      project
    });

  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
    });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
      return;
    }

    const projectId = req.params.projectId as string;

    // Check if project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.userId
      }
    });

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    // Delete associated task statuses first (due to foreign key constraint)
    await prisma.taskStatus.deleteMany({
      where: { projectId: projectId }
    });

    // Delete the project
    await prisma.project.delete({
      where: { id: projectId }
    });

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete project'
    });
  }
};


// Get roadmap data for a specific project
export const getProjectRoadmap = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
      return;
    }

    const projectId = req.params.projectId as string;

    // Fetch project with roadmap data
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.userId
      },
      include: {
        taskStatuses: true
      }
    });

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    // Get roadmap data from JSONB
    const roadmapData = project.roadmapData as any;

    // Merge task statuses from database with roadmap data
    const roadmapWithStatuses = roadmapData.map((category: any) => ({
      ...category,
      tasks: category.tasks.map((task: any) => {
        // Find status from TaskStatus table
        const taskStatus = project.taskStatuses.find(
          ts => ts.taskId === task.id
        );

        return {
          ...task,
          status: taskStatus?.status || 'pending' // Default to pending if no status found
        };
      })
    }));

    res.status(200).json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        sector: project.domain,
        location: `${capitalizeLocation(project.locationCity)}, ${project.locationState}`,
        structure: formatLegalStructure(project.legalStructure),
        teamSize: project.teamSize,
        completedCount: project.completedCount,
        totalCount: project.totalCount,
        roadmapData: roadmapWithStatuses
      }
    });

  } catch (error) {
    console.error('Get project roadmap error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch roadmap'
    });
  }
};

// Update task status
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
      return;
    }

    const projectId = req.params.projectId as string;
    const { taskId, status } = req.body;

    // Validate status
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      res.status(400).json({
        success: false,
        error: 'Invalid status. Must be pending, in-progress, or completed'
      });
      return;
    }

    // Check if project belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.userId
      }
    });

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    // Upsert task status
    const taskStatus = await prisma.taskStatus.upsert({
      where: {
        projectId_taskId: {
          projectId: projectId,
          taskId: taskId
        }
      },
      update: {
        status: status
      },
      create: {
        projectId: projectId,
        taskId: taskId,
        status: status
      }
    });

    // Recalculate completed count
    const allTaskStatuses = await prisma.taskStatus.findMany({
      where: { projectId: projectId }
    });

    const completedCount = allTaskStatuses.filter(ts => ts.status === 'completed').length;

    // Update project completed count
    await prisma.project.update({
      where: { id: projectId },
      data: { completedCount: completedCount }
    });

    res.status(200).json({
      success: true,
      taskStatus,
      completedCount,
      totalCount: project.totalCount,
      message: 'Task status updated successfully'
    });

  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task status'
    });
  }
};