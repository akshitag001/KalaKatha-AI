# KalaKatha AI – Stories of India Through Living Art Forms

KalaKatha AI is a multimodal creative storytelling agent built for Google Cloud using the latest Google Gemini and Imagen models via Vertex AI. 
It generates culturally rich stories and stunning visual illustrations based on traditional Indian regional art styles, directly from user prompts.

## Project Architecture

1.  **Frontend**: A simple, clean Vanilla HTML/CSS/JS interface using modern design aesthetics (glassmorphism, clean typography) inspired by Indian colors.
2.  **API Layer (Express.js Backend)**: Node.js server that manages routing, handles API requests from the frontend, and coordinates AI generation.
3.  **AI Services (Vertex AI)**:
    *   **Text Generation**: Connects to `gemini-1.5-flash` to structure dynamic, 4-part narratives based on the User's scenario and selected art style. It also generates tailored image prompts.
    *   **Image Generation**: Connects to `imagen-3.0-generate-001` (Imagen 3) using generated prompts to create visuals perfectly attuned to the requested Indian art style (Madhubani, Warli, Pattachitra, Gond).

---

## Technical Stack
- Node.js & Express
-  Google GenAI SDK (`@google/genai`)
-  HTML5/CSS3/Vanilla JS
-  Google Cloud Run & Vertex AI

---

## Local Setup & Development

### 1. Prerequisites
- Node.js installed (v18+)
- A Google Cloud Project with Billing Enabled.
- Vertex AI API enabled in your Google Cloud Project.
- Google Cloud CLI (`gcloud`) installed and configured.

### 2. Authentication
You have **two options** for authenticating with Google's AI services:

**Option A (Recommended for Local Dev): Standard Google AI Studio Key**
Generate an API Key from Google AI Studio and place it in your `.env` file. No cloud project setup is strictly required for text generation (though Imagen 3 might require a GCP project with billing enabled).

**Option B: Google Cloud Vertex AI (Default)**
Locally, the application relies on Application Default Credentials (ADC).
Run the following command to authenticate your local environment with your Google Cloud Project:
```bash
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

### 3. Installation
Clone the repository, then install dependencies:
```bash
npm install
```

### 4. Environment Variables
Copy the provided `.env.example` to a `.env` file and populate it:
```bash
cp .env.example .env
```
Edit `.env` to include:
- `GEMINI_API_KEY`: Your Google Gemini API Key (Option A).
- `GOOGLE_CLOUD_PROJECT_ID`: Your actual GCP project ID (Option B).
- `GOOGLE_CLOUD_LOCATION`: Typically `us-central1`.

### 5. Running the Application
Start the server:
\`\`\`bash
npm start
\`\`\`
Or simply:
\`\`\`bash
node server.js
\`\`\`
The frontend will be accessible at http://localhost:3000

---

## Deploying to Google Cloud Run

To deploy this containerized application on Google Cloud Run, execute the following using the Google Cloud CLI:

1. **Deploy from Source**:
\`\`\`bash
gcloud run deploy kalakatha-ai \\
  --source . \\
  --region us-central1 \\
  --allow-unauthenticated \\
  --set-env-vars GOOGLE_CLOUD_PROJECT_ID=your-project-id,GOOGLE_CLOUD_LOCATION=us-central1
\`\`\`

2. After successful deployment, \`gcloud\` will provide you with a hosted Service URL. Visit that URL to use the application!
