# KalaKatha AI - System Architecture

This diagram illustrates how the KalaKatha AI application connects the frontend user interface to Google Cloud's Generative AI models.

```mermaid
graph TD
    classDef user fill:#e6a836,stroke:#a13d25,stroke-width:2px,color:#2a2a2a;
    classDef frontend fill:#f7f3eb,stroke:#c94f31,stroke-width:2px,color:#2a2a2a;
    classDef backend fill:#2e4a62,stroke:#f7f3eb,stroke-width:2px,color:#f7f3eb;
    classDef google fill:#ffffff,stroke:#4285F4,stroke-width:2px,color:#2a2a2a;

    A[User]:::user -->|Enters Scenario & Selects Art Style| B(Frontend: HTML/CSS/JS):::frontend
    B -->|POST /api/generate-story| C{Backend: Node.js & Express}:::backend
    
    subgraph "Google Cloud Platform"
        D("@google/genai SDK"):::google
        E(Gemini 1.5 Flash):::google
        F(Imagen 3):::google
    end

    C <-->|Authentication: API Key / Vertex AI ADC| D
    
    D -->|Step 1: System Prompt + JSON Schema| E
    E -->|Returns Structured Story + Scene Image Prompts| D
    
    D -->|Step 2: Parallel Requests (4x)| F
    F -->|Returns Base64 Indian Art Illustrations| D
    
    D -->|Aggregated JSON Data| C
    C -->|Returns Final Multimodal Object| B
    B -->|Dynamically Renders Interleaved UI| A
```
