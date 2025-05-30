FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only package files to install dependencies early (cache optimization)
COPY package*.json ./
RUN npm install

# Install nodemon globally for live reload
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Generate Prisma client when container starts
CMD ["sh", "-c", "npx prisma generate && npm run dev"]

EXPOSE 5000
