# Stage 1: Build the React application using Vite
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install --production=false

# Check installed packages
RUN ls -la /app/node_modules/.bin

# Copy the rest of the application code
COPY . .


# Check build output
RUN ls -la /app/dist

# Stage 2: Serve the application with a lightweight web server
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.config /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
