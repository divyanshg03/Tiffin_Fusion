# Use the official Nginx image
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static assets
RUN rm -rf ./*

# Copy the static files from your project into the container
COPY . .

# Expose port 80 for HTTP
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
