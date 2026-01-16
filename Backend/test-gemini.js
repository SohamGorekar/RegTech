const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listAvailableModels() {
  console.log('🔍 Discovering available Gemini models...\n');

  if (!API_KEY) {
    console.error('❌ ERROR: GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

  // Try different model names
  const modelsToTry = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-2.0-flash-exp',
    'models/gemini-pro',
    'models/gemini-1.5-pro',
    'models/gemini-2.5-flash'
  ];

  console.log('Testing models...\n');

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hi');
      const response = result.response.text();
      
      console.log(`✅ ${modelName} - WORKING!`);
      console.log(`   Response: ${response.substring(0, 50)}...\n`);
      
    } catch (error) {
      if (error.status === 404) {
        console.log(`❌ ${modelName} - Not available (404)`);
      } else if (error.status === 429) {
        console.log(`⚠️  ${modelName} - Rate limited (might work later)`);
      } else {
        console.log(`❌ ${modelName} - Error: ${error.message}`);
      }
    }
  }
}

listAvailableModels();