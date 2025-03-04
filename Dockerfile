# Use official Node.js image as a base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the Next.js project (אם זה Next.js)
RUN npm run build

# Expose the port (שנה בהתאם לצורך)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]