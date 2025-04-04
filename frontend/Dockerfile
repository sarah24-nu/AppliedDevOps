    FROM node:18 AS builder

    WORKDIR /app
    
    COPY package.json package-lock.json ./
    
    RUN npm install --only=production --legacy-peer-deps
    
 
    FROM node:18
    
    WORKDIR /app
    
    COPY --from=builder /app/node_modules ./node_modules
    
    COPY . .
    
    EXPOSE 8081
    
    CMD ["npm", "start"]
    