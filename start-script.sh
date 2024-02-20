#!/bin/bash

# Navigate to your project directory
cd "~/Dev/JSF-600 Dolphin Chat/T-JSF-600-LYO_15/"

# Stop running containers
echo "Stopping containers..."
docker-compose down

# Build and launch containers
echo "Starting containers..."
docker-compose up --build -d

echo "Containers have been restarted."
