FROM node:20-bullseye

# Install OS-level dependencies for OCR and PDF processing
RUN apt-get update && \
    apt-get install -y tesseract-ocr && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the backend port
EXPOSE 4001

# Start the production server
CMD ["node", "dist/src/main.js"]
