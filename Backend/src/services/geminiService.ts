import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildPromptFromStencil } from './promptBuilderService';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface BusinessDNA {
  projectName: string;
  projectDescription: string;
  sector: string;
  state: string;
  city: string;
  structure: string;
  teamSize: number;
}

export const generateRoadmapWithGemini = async (businessDNA: BusinessDNA): Promise<any> => {
  try {
    const prompt = buildPromptFromStencil(businessDNA);

    console.log('Sending prompt to Gemini...');

    const model = genAI.getGenerativeModel({ 
      model: 'models/gemini-2.5-flash',  // ✅ THIS IS THE WORKING MODEL!
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8000,
      }
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('Received response from Gemini');

    let cleanedText = text.trim();
    
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }

    cleanedText = cleanedText.trim();

    console.log('Cleaned response, attempting to parse JSON...');

    const roadmapData = JSON.parse(cleanedText);

    if (!Array.isArray(roadmapData)) {
      throw new Error('Invalid roadmap format: expected array of categories');
    }

    if (roadmapData.length === 0) {
      throw new Error('Roadmap is empty');
    }

    for (const category of roadmapData) {
      if (!category.id || !category.category || !Array.isArray(category.tasks)) {
        throw new Error('Invalid category structure');
      }
      for (const task of category.tasks) {
        if (!task.id || !task.title || !task.status || !task.timeline || !task.description) {
          throw new Error('Invalid task structure');
        }
      }
    }

    console.log('Roadmap validated successfully');
    const totalTasks = roadmapData.reduce((sum: number, cat: any) => sum + cat.tasks.length, 0);
    console.log('Generated ' + roadmapData.length + ' categories with ' + totalTasks + ' total tasks');

    return roadmapData;

  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse Gemini response as JSON');
    }
    
    throw new Error('Gemini generation failed: ' + error.message);
  }
};