# Stage 1: Build React app
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve React app
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built React app from the previous stage
COPY --from=builder /app/public ./public

# Install a static server to serve the React app
RUN npm install -g serve

# Expose port 9000 for the server
EXPOSE 9000

# Run the static server to serve the React app
CMD ["serve", "-s", "public", "-l", "9000"]
