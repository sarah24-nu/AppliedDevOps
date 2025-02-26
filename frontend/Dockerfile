# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first (for better caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose the Metro Bundler port
EXPOSE 8081

# Start the React Native development server
CMD ["npm", "start"]
