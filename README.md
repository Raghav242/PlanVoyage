# 🗺️ PlanVoyage App

The **PlanVoyage App** is a full-stack web application that allows users to search for travel destinations, find nearby places of interest, and create personalized trip plans. Users can save their plans for future reference and explore trip suggestions from other travelers.

---

## 🚀 Features

### ✅ Public Features (No Login Required)
- 🌍 **Search Locations** – Users can search for a city (e.g., Boston) and get nearby places based on distance.
- 📍 **View Places** – Fetches results from the **Geoapify** API.
- 🔎 **Explore Suggested Itinerary** – View trip plans created by other users.

### 🔐 User Features (Login Required)
- ➕ **Save Trip Plans** – Add places to a personalized list.
- ✏️ **Edit/Delete Plans** – Modify or remove saved trips.
- 📝 **Submit Custom Plans** – Create and share trip plans manually.
- 🔑 **User Authentication** – Register, log in, and manage sessions using JWT and cookies.

---

## 🏗️ Tech Stack

### **Frontend (React)**
- **Framework:** React.js (Vite)
- **State Management:** Context API
- **UI Library:** Bootstrap
- **API Calls:** Axios
- **Routing:** React Router
- **Testing:** Vitest + React Testing Library

### **Backend (Node.js + Express)**
- **Framework:** Express.js
- **ORM:** Prisma
- **Authentication:** JWT + HTTP-only Cookies
- **Database:** PostgreSQL
- **External API:** Geoapify

### **Deployment**
- **Frontend:** Vercel & AWS EC2 (Docker)
- **Backend:** Render & AWS EC2 (Docker)
- **CI/CD:** GitHub Actions with Docker on EC2

---

## 📂 Project Structure

```bash
trip-planner/
│── client/               # Frontend (React)
│── api/                  # Backend (Node.js + Express + Prisma)
│   └── prisma/           # Prisma schema & migrations
│── docker-compose.yml    # Docker orchestration
│── README.md             # Documentation

🐳 Docker Setup & AWS EC2 Deployment
🛠️ Prerequisites
Docker & Docker Compose installed on EC2

Node.js and Git installed

Ports 22 (SSH), 80 (HTTP), 5000 (Backend), 5173 (Frontend) open in EC2 security group

🚀 Deployment Steps on EC2

# SSH into your EC2
ssh -i "your-key.pem" ubuntu@your-ec2-ip

# Clone the repository
git clone https://github.com/Raghav242/PlanVoyage.git
cd PlanVoyage

# Populate environment variables in api/.env and client/.env
# Example:
nano api/.env
nano client/.env

# Build and start Docker containers
sudo docker-compose up --build -d

# If schema was not applied, run:
sudo docker-compose exec backend npx prisma migrate deploy


📦 Local Development
🔁 Backend Setup (api/)
cd api
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev


🔁 Frontend Setup (client/)
cd client
npm install
cp .env.example .env
npm run dev

⚙️ CI/CD with GitHub Actions
This project includes a GitHub Actions workflow to:

Automatically build Docker containers

SSH into EC2 instance

Pull latest code

Rebuild and restart containers

Ensure your SSH key is added as a GitHub secret, and proper .env files are already on the EC2 instance.

Workflow file: .github/workflows/deploy.yml

🧪 Testing (Vitest)
Install test dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

Configure Vitest
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
});

// src/tests/setup.js
import '@testing-library/jest-dom';

Add test script
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch"
}

Run tests

npm run test

🌐 Live Links
🖥️ Frontend (Vercel): https://planvoyage-phi.vercel.app/

🔧 Backend (Render): https://planvoyage.onrender.com

🌍 EC2 Hosted Site: http://44.210.115.94:5173


🧭 Usage Guide
Search a city on the homepage to get nearby places.

Log in to create/select a trip plan.

Add places to your plan.

View and manage saved trips.

Browse or submit trip suggestions from/to other users.
