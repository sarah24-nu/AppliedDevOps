# ---------- Stage 1: Install Dependencies ----------
    FROM node:18 AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json first (to leverage caching)
    COPY package.json package-lock.json ./
    
    # Install dependencies
    RUN npm install --only=production
    
    # ---------- Stage 2: Final Image ----------
    FROM node:18
    
    # Set working directory
    WORKDIR /app
    
    # Copy installed dependencies from the builder stage
    COPY --from=builder /app/node_modules ./node_modules
    
    # Copy the entire project
    COPY . .
    
    # Expose the Metro Bundler port
    EXPOSE 8081
    
    # Start the React Native development server
    CMD ["npm", "start"]
    