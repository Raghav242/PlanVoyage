import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import TripPlanner from './pages/TripPlanner';
import SavedPlans from './pages/SavedPlans';
import SuggestedPlans from './pages/SuggestedPlans';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="text-primary">Hello, Vite + React!</h1>
        <p className="lead">Bootstrap styling is working 🎉</p>
        <button className="btn btn-success">Click Me</button>
      </div>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/saved-plans" element={<SavedPlans />} />
        <Route path="/suggested-plans" element={<SuggestedPlans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

