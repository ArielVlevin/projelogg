# Use official Node.js image as a base
FROM node:23.6.1

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install 

# Copy the rest of the application files
COPY . .

# Ensure Next.js environment variables exist
ENV NODE_ENV=production


# Build the Next.js project 
RUN npm run build

# Expose the port 
EXPOSE 3000

# Ensure `.next` directory is available
VOLUME ["/app/.next"]

# Start the application
CMD ["npm", "start"]


#COPY package.json package-lock.json ./
