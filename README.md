# 🗺️ PlanVoyage App

The **PlanVoyage App** is a full-stack web application that allows users to search for travel destinations, find nearby places of interest, and create personalized trip plans. Users can save their plans for future reference and explore trip suggestions from other travelers.

---

## 🚀 Features

### ✅ Public Features (No Login Required)
- 🌍 **Search Locations** – Users can search for a city (e.g., Boston) and get nearby places based on distance.
- 📍 **View Places** – Fetches results from the **GeoNames API**.
- 🔎 **Explore Suggested Plans** – View trip plans created by other users.

### 🔐 User Features (Login Required)
- ➕ **Save Trip Plans** – Add places to a personalized list.
- ✏️ **Edit/Delete Plans** – Modify or remove saved trips.
- 📝 **Submit Custom Plans** – Create and share trip plans manually.
- 🔑 **User Authentication** – Register, log in, and manage sessions using JWT authentication.

---

## 🏗️ Tech Stack

### **Frontend (React)**
- **Framework:** React.js (Vite)
- **State Management:** Context API / Redux
- **UI Library:** Bootstrap CSS
- **API Calls:** Axios
- **Routing:** React Router
- **Testing:** React Testing Library & Lighthouse

### **Backend (Node.js + Express)**
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Authentication:** JSON Web Token (JWT) + HTTP-only Cookies
- **Database:** PostgreSQL
- **External API Integration:** GeoNames API
- **Deployment:** Vercel (Frontend), Render/Fly.io (Backend), Supabase (Database)

---

## 📂 Project Structure

```bash
trip-planner/
│── client/               # Frontend (React)
│── api/                  # Backend (Node.js + Express + Prisma)
│── prisma/               # Database schema & migrations
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
│   ├── api/              # API functions (auth.js, places.js, plans.js, suggestions.js)
│   ├── styles/           # Tailwind CSS global styles
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

# 🛠️ Installation & Setup

# 1️⃣ Clone the Repository
git clone https://github.com/Raghav242/trip-planner.git
cd trip-planner

# 2️⃣ Backend Setup (api/)
cd api
npm install
cp .env.example .env   # Update environment variables
npx prisma migrate dev  # Apply Prisma migrations
npm run dev             # Start the backend server

# 3️⃣ Frontend Setup (client/)
cd client
npm install
npm run dev             # Start React frontend

# 🚀 Deployment

# Frontend Deployment (Vercel)
vercel deploy

# Backend Deployment (Render)
# 1. Push your code to GitHub.
# 2. Connect Render with your GitHub repository.
# 3. Add environment variables in Render Dashboard.
# 4. Deploy the backend.

