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
import NotFound from './pages/NotFound';
import TripSuggestions from './pages/TripSuggestions';
import EditSuggestion from './pages/EditSuggestion';
import ViewSuggestion from './pages/ViewSuggestions';
import AddSuggestion from './pages/AddSuggestion';
import PlanTrips from './pages/planTrips';
import Plans from './pages/Plans';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan-trips" element={<PlanTrips />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/saved-plans" element={<SavedPlans />} />
        <Route path="/suggested-plans" element={<SuggestedPlans />}/>
        {/* <Route path="/suggestions" element={<TripSuggestions />} /> */}
        <Route path="/add-suggestion" element={<AddSuggestion />} />
        <Route path="/edit-suggestion/:suggestionId" element={<EditSuggestion />} /> 
        <Route path="/view-suggestion/:suggestionId" element={<ViewSuggestion />} />
        <Route path="/trip-suggestions/:suggestionId" element={<TripSuggestions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="*" element={<NotFound/> }/>
      </Routes>
    </>
  );
}

