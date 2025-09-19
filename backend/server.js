const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Prompt enhancement system prompt
const ENHANCEMENT_SYSTEM_PROMPT = `You are a prompt enhancement specialist. Your job is to take user prompts and make them clearer, more detailed, and better structured for AI code generation.

When enhancing prompts, you should:
1. Add missing context (programming language, framework, libraries)
2. Clarify vague requirements
3. Structure the request logically
4. Add expected output format details
5. Include error handling requirements if applicable
6. Make assumptions explicit
7. Add relevant constraints or best practices

Keep the enhanced prompt focused and actionable. Don't make it unnecessarily long, but ensure it's comprehensive enough for high-quality AI responses.

Return only the enhanced prompt text, nothing else.`;

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main enhancement endpoint
app.post('/api/enhance', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Prompt is required and must be a string'
            });
        }

        if (prompt.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Prompt cannot be empty'
            });
        }

        if (prompt.length > 5000) {
            return res.status(400).json({
                success: false,
                error: 'Prompt is too long (max 5000 characters)'
            });
        }

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.'
            });
        }

        console.log(`Enhancing prompt: "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"`);

        // Call OpenAI to enhance the prompt
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: ENHANCEMENT_SYSTEM_PROMPT
                },
                {
                    role: 'user',
                    content: `Please enhance this prompt:\n\n${prompt}`
                }
            ],
            max_tokens: 1000,
            temperature: 0.3,
        });

        const enhancedPrompt = response.choices[0]?.message?.content?.trim();

        if (!enhancedPrompt) {
            throw new Error('No enhanced prompt received from OpenAI');
        }

        console.log(`Enhancement completed. Original length: ${prompt.length}, Enhanced length: ${enhancedPrompt.length}`);

        res.json({
            success: true,
            enhanced_prompt: enhancedPrompt,
            original_prompt: prompt,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Enhancement error:', error);

        let errorMessage = 'Internal server error';
        let statusCode = 500;

        if (error.code === 'insufficient_quota') {
            errorMessage = 'OpenAI API quota exceeded. Please check your billing.';
        } else if (error.code === 'invalid_api_key') {
            errorMessage = 'Invalid OpenAI API key';
        } else if (error.code === 'model_not_found') {
            errorMessage = 'OpenAI model not available';
        } else if (error.message?.includes('timeout')) {
            errorMessage = 'Request timeout. Please try again.';
            statusCode = 408;
        } else if (error.message) {
            errorMessage = error.message;
        }

        res.status(statusCode).json({
            success: false,
            error: errorMessage
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Cursor Prompt Enhancer Backend running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`🔧 Enhancement endpoint: http://localhost:${PORT}/api/enhance`);
    
    if (!process.env.OPENAI_API_KEY) {
        console.warn('⚠️  WARNING: OPENAI_API_KEY environment variable not set!');
        console.warn('   Please set it before making enhancement requests.');
    } else {
        console.log('✅ OpenAI API key configured');
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    process.exit(0);
});
