#!/bin/bash

# ==============================================================================
# KalaKatha AI - Automated Deployment Script for Google Cloud Run
# ==============================================================================
# 
# This script automates building the Docker image and deploying it to 
# Google Cloud Run in a single command.
#
# PREREQUISITES:
# 1. Google Cloud SDK (gcloud) installed and authenticated.
# 2. A Google Cloud Project created with billing enabled.
# 3. Cloud Run API and Artifact Registry API enabled on the project.
#
# USAGE:
# 1. Open your terminal in the project root directory.
# 2. Make the script executable: chmod +x deploy_to_cloud_run.sh
# 3. Run the script: ./deploy_to_cloud_run.sh
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# --- Configuration variables (Change these to your specifics if needed) ---
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="kalakatha-ai-service"
REGION="us-central1"
IMAGE_TAG="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest"

echo "🚀 Starting Automated Deployment for KalaKatha AI..."
echo "📂 Project ID: ${PROJECT_ID}"
echo "🌎 Region: ${REGION}"

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Error: Google Cloud Project ID not found."
    echo "Please set it using: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

# Step 1: Build the Docker image using Google Cloud Build
echo "📦 Step 1: Building the Docker image via Google Cloud Build..."
gcloud builds submit --tag $IMAGE_TAG

# Step 2: Deploy the image to Google Cloud Run
echo "🚢 Step 2: Deploying to Google Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_TAG \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 3000

# Deployment complete
echo "✨ Deployment Successful!"
echo "🌐 Your KalaKatha AI application is now live!"
