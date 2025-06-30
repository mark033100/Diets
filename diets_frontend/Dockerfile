# ---- Build Stage ----
# 1️⃣ Use the latest Node.js image as the base for the build stage.
# FROM node:latest AS builder

# # 2️⃣ Set the working directory inside the container.
# WORKDIR /app

# # 3️⃣ Copy package.json and package-lock.json to the working directory.
# COPY package*.json ./

# # 4️⃣ Install all dependencies using npm (clean install ensures no unnecessary packages).
# RUN npm ci

# # 5️⃣ Copy the entire source code into the container's working directory.
# COPY . .

# # 6️⃣ Build the application. The build output will be stored in the ".output" directory.
# RUN npm run build

# # ---- Production Stage ----
# # 1️⃣ Use the latest Node.js image as the base for the production stage.
# FROM node:latest

# # 2️⃣ Set the working directory inside the container.
# WORKDIR /app

# # 3️⃣ Copy the built application and related package files from the build stage.
# COPY --from=builder /app/.output /app/.output
# COPY --from=builder /app/package*.json ./

# #  Start the application using Node.js.
# CMD ["node", ".output/server/index.mjs"]


# Use Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire source code into the container's working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 80

# Start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"] 