# 🗺️ PlanVoyage App

The **PlanVoyage App** is a full-stack web application that allows users to search for travel destinations, find nearby places of interest, and create personalized trip plans. Users can save their plans for future reference and explore trip suggestions from other travelers.

---

## 🚀 Features

### ✅ Public Features (No Login Required)
- 🌍 **Search Locations** – Users can search for a city (e.g., Boston) and get nearby places based on distance.
- 📍 **View Places** – Fetches results from the **Geoapify**.
- 🔎 **Explore Suggested Itinery** – View trip plans created by other users.

### 🔐 User Features (Login Required)
- ➕ **Save Trip Plans** – Add places to a personalized list.
- ✏️ **Edit/Delete Plans** – Modify or remove saved trips.
- 📝 **Submit Custom Plans** – Create and share trip plans manually.
- 🔑 **User Authentication** – Register, log in, and manage sessions using JWT authentication.

---

## 🏗️ Tech Stack

### **Frontend (React)**
- **Framework:** React.js (Vite)
- **State Management:** Context API
- **UI Library:** Bootstrap CSS
- **API Calls:** Axios
- **Routing:** React Router
- **Testing:** Vitest

### **Backend (Node.js + Express)**
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Authentication:** JSON Web Token (JWT) + HTTP-only Cookies
- **Database:** PostgreSQL
- **External API Integration:** Geoapify
- **Deployment:** Vercel (Frontend), Render (Backend), Render (Database)

---

## 📂 Project Structure

```bash
trip-planner/
│── client/               # Frontend (React)
│── api/                  # Backend (Node.js + Express + Prisma)
    │── prisma/           # Database schema & migrations
│── .gitignore            # Ignore files for Git
│── README.md             # Documentation
│── package.json          # Project dependencies
│── .env                  # Environment variables


FrontEnd (client/)
client/
│── public/               # Static assets
│── src/
│   ├── components/       # Reusable UI components (Navbar, Footer, SearchBar, PlaceCard)
│   ├── pages/            # React Pages (Home, SearchResults, TripPlanner, SavedPlans, SuggestedPlans, Login)
│   ├── context/          # Global state management (AuthContext, PlanContext)
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # Renders the app
│── tests/                # Unit tests
│── package.json          # Project dependencies

Backend (api/)
api/
│── src/
│   ├── controllers/      # Business logic (authController, placeController, planController, suggestionController)
│   ├── routes/          # API Endpoints (authRoutes, placeRoutes, planRoutes, suggestionRoutes)
│   ├── middleware/      # Middleware (authMiddleware, errorHandler)
│   ├── config/          # Prisma database connection (db.js)
│   ├── index.js         # Main Express.js server file
│── tests/               # Unit tests
│── package.json         # Dependencies
│── .env                 # Environment variables
```
---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NEU-CS5610-2025-ONL-SPRING/final-project-part-3-planvoyage.git
cd trip-planner
```

### 2️⃣ Backend Setup (api/)
```bash
cd api
```
```bash
npm install
```
#### Update environment variables
```bash
cp .env.example .env
```

#### Apply Prisma migrations
```bash
npx prisma migrate dev
```
#### Start the backend server
```bash
nodemon index.js
```         

### 3️⃣ Frontend Setup (client/)
```bash
cd client
```

```bash
npm install
```

#### Start React frontend
```bash
npm run dev
```        
---

### How to Run Test Cases

## 🧪 Testing (Vitest)

This project uses Vitest and React Testing Library for unit and component testing.

### 📦 Install Test Dependencies

If not already installed, run:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

### ⚙️ 2. Configure Vitest
```bash
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js', // Optional: for jest-dom matchers
  },
});
```

#### Create a setup file for jest-dom matchers:

```bash
// src/tests/setup.js
import '@testing-library/jest-dom';

```

### 🧾 3. Add Test Scripts to package.json

```bash
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:watch": "vitest --watch"
}
```

### ▶️ 4. Run Tests

``` bash
npx vitest
```

---

### 🧭 How to Use the App
1. Use the homepage to search for a city and explore nearby places.

2. Log in to create or select a trip plan.

3. Add places to your plan from the search results.

4. View and edit your saved plans in the "Saved Plans" page.

5. Explore others' suggested plans in the "Suggested Itineries" section.

6. Create and submit your own suggestions for others to see.


---

### 🚀 Deployment Links
1. 🌐 Frontend (Vercel): https://planvoyage-phi.vercel.app/

2. 🔧 Backend (Render): https://planvoyage.onrender.com

3. 🗃️ Database (PostgreSQL on Render): Managed via Render + Prisma



