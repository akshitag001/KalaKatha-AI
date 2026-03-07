/**
 * KalaKatha AI - Google Cloud & Google Gen AI API Demonstration
 * 
 * This standalone script demonstrates exactly how our application interacts with 
 * Google Cloud services and the Google Gen AI APIs (Gemini & Imagen) to power 
 * the multimodal storytelling experience.
 * 
 * Hackathon Judges: You can run this file directly to verify the API integration:
 * `node gcp_api_demo.js`
 */

require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

// Ensure required environment variables exist
if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_CLOUD_PROJECT_ID) {
    console.error('❌ ERROR: Missing authentication credentials.');
    console.error('Please set exactly one of the following in your .env file:');
    console.error('1. GEMINI_API_KEY (from Google AI Studio)');
    console.error('2. GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CLOUD_LOCATION (for Vertex AI)');
    process.exit(1);
}

/**
 * Initializes and returns the official Google Gen AI Client.
 * Demonstrates support for both API Keys (AI Studio) and Vertex AI (GCP).
 */
function initializeGoogleAIClient() {
    console.log('🔄 Initializing Google GenAI Client...');

    // Check for standard API key first (easier for local development)
    if (process.env.GEMINI_API_KEY) {
        console.log('🔑 Using GEMINI_API_KEY authentication.');
        return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    // Fall back to Vertex AI if explicitly configured (for production/GCP environments)
    console.log(`☁️ Using Google Cloud Vertex AI (Project: ${process.env.GOOGLE_CLOUD_PROJECT_ID}).`);
    return new GoogleGenAI({
        vertexai: {
            project: process.env.GOOGLE_CLOUD_PROJECT_ID,
            location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
        }
    });
}

/**
 * Demonstrates calling the Gemini 1.5 Flash model to generate structured JSON data.
 * This is the core logic used to create our culturally rich story narratives.
 */
async function demonstrateGeminiTextGeneration(aiClient) {
    console.log('\n==================================================');
    console.log('🚀 API CALL 1: Google Gemini (Text & Narrative)');
    console.log('==================================================');

    const prompt = `
    Write a tiny, two-sentence story about a brave squirrel. 
    Format the output strictly as JSON with this schema:
    { "title": "String", "story": "String" }
    `;

    console.log('Sending prompt to model: gemini-1.5-flash...');

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
                // Ensure structured JSON output for easy application parsing
                responseMimeType: 'application/json',
                temperature: 0.7,
            }
        });

        console.log('✅ Gemini Response Received Successfully:');
        console.log(JSON.parse(response.text()));
        return true;
    } catch (error) {
        console.error('❌ Gemini API Call Failed:', error.message);
        return false;
    }
}

/**
 * Demonstrates calling the Imagen 3 model to generate artwork.
 * This is the core logic used to create our Indian art illustrations.
 */
async function demonstrateImagenGeneration(aiClient) {
    console.log('\n==================================================');
    console.log('🚀 API CALL 2: Google Imagen 3 (Image Generation)');
    console.log('==================================================');

    const imagePrompt = "A beautiful, highly detailed painting of a lotus flower in the traditional Indian Pattachitra art style. Rich colors, mythological motifs.";

    console.log('Sending prompt to model: imagen-3.0-generate-001 (or 002)...');
    console.log(`Prompt: "${imagePrompt}"`);
    console.log('Config: Aspect Ratio 4:3, JPEG output.');

    try {
        // Note: Using imagen-3.0-generate-002 as it's generally more compatible 
        // with standard API keys from AI Studio vs Vertex.
        const response = await aiClient.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '4:3'
            }
        });

        // The image comes back encoded as base64 bytes
        const base64Length = response.generatedImages[0].image.imageBytes.length;
        console.log('✅ Imagen Response Received Successfully!');
        console.log(`Successfully generated image data. Received ${base64Length} bytes of base64 encoded image data.`);
        console.log('(In the main app, this base64 string is embedded directly into the HTML `<img>` src attribute).');
        return true;

    } catch (error) {
        console.warn('⚠️ Imagen API Call Failed (See note below):');
        console.error(error.message);
        console.warn('\nNote: Imagen 3 generation may fail if using a free-tier GEMINI_API_KEY from Google AI Studio, as it often requires a paid Google Cloud Project with active billing on Vertex AI. Our application handles this gracefully by falling back to placeholder images to keep the UI functional during development/hackathons without billing.');
        return false;
    }
}

// Run the demonstration
async function runDemonstration() {
    const aiClient = initializeGoogleAIClient();

    await demonstrateGeminiTextGeneration(aiClient);
    await demonstrateImagenGeneration(aiClient);

    console.log('\n✨ Demonstration complete. See services/ai.js for the full production implementation.');
}

runDemonstration();
