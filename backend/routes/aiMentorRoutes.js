const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper function to handle Gemini API requests
async function handleGeminiRequest(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error.name === 'GoogleGenerativeAIFetchError') {
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your GEMINI_API_KEY environment variable.');
      }
      throw new Error('AI service is currently unavailable. Please try again later.');
    }
    throw error;
  }
}

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// List of supported languages
const supportedLanguages = [
  'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'swift',
  'kotlin', 'typescript', 'php', 'rust', 'scala', 'dart', 'r'
];

router.post('/code-analysis', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required.' });
    }

    if (!supportedLanguages.includes(language.toLowerCase())) {
      return res.status(400).json({ error: 'Unsupported programming language.' });
    }

    console.log('Received request for code analysis:', { language, codeLength: code.length });

    const prompt = `Analyze the following ${language} code and provide suggestions for improvement:

${code}

Generate concise and Please provide:
1. Code quality assessment
2. Potential bugs or issues
3. Optimization suggestions
4. Generate possible output of the code.
5. Best practices recommendations`;

    const analysis = await handleGeminiRequest(prompt);
    res.json({ analysis });
  } catch (error) {
    console.error('Error in code analysis:', error);
    res.status(500).json({ 
      error: 'An error occurred while analyzing the code.',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

router.post('/generate-exercise', async (req, res) => {
  try {
    const { language, difficulty } = req.body;

    if (!language || !difficulty) {
      return res.status(400).json({ error: 'Language and difficulty are required.' });
    }

    if (!supportedLanguages.includes(language.toLowerCase())) {
      return res.status(400).json({ error: 'Unsupported programming language.' });
    }

    console.log('Received request for exercise generation:', { language, difficulty });

    const prompt = `Generate a coding exercise for ${language} at ${difficulty} difficulty level. Include:
1. Problem statement
2. Input/output examples
3. Constraints
4. Starter code`;

    const exercise = await handleGeminiRequest(prompt);
    res.json({ exercise });
  } catch (error) {
    console.error('Error in exercise generation:', error);
    res.status(500).json({ 
      error: 'An error occurred while generating the exercise.',
      details: error.message
    });
  }
});

router.post('/answer-question', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    console.log('Received request to answer question:', { questionLength: question.length });

    const prompt = `Answer the following programming-related question:

${question}

Please provide a clear and concise explanation.`;

    const answer = await handleGeminiRequest(prompt);
    res.json({ answer });
  } catch (error) {
    console.error('Error in answering question:', error);
    res.status(500).json({ 
      error: 'An error occurred while answering the question.',
      details: error.message
    });
  }
});

module.exports = router;