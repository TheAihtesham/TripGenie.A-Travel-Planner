"use client";

import React, { useEffect, useState } from "react";
import { getPlans } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for transitions
import PlanCard from "../components/PlanCard";
import PlanForm from "../components/PlanForm";

// Define a container variant for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children for a smooth entry
    },
  },
};

// Define a card variant
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function PlannerPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [openModal, setOpenModal] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error(err);
      // Removed alert, using a less intrusive UI message is better practice
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    // Set a very light background color for a fresh look
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between items-center px-6 md:px-12 py-3 border-b border-gray-100 bg-white shadow-md">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          // Enhanced gradient for a vibrant, travel-themed logo
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500 tracking-tight"
        >
          TripGenie 🗺️
        </motion.h1>

        <motion.button
          onClick={() => setOpenModal(true)}
          whileHover={{ scale: 1.02}} // Subtle lift and colored shadow
          whileTap={{ scale: 0.98 }}
          // Gradient button for prominence
          className="flex items-center gap-1 px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full text-base shadow-lg transition duration-200 ease-out text-[15px]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Plan
        </motion.button>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {loading ? (
            // --- Loading State ---
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-amber-500 border-gray-200 mb-4"></div>
                <p className="text-gray-500 text-lg">Fetching your travel history...</p>
            </div>
        ) : plans.length === 0 ? (
          // --- Empty State (Enhanced) ---
          <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white border border-dashed border-gray-200 rounded-2xl shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-400 mb-4 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p className="text-gray-600 text-xl font-semibold mb-2">
              No journeys planned yet! 🚀
            </p>
            <p className="text-gray-400 text-base max-w-md">
              Tap the **"Create Plan"** button to let AI create your perfect, personalized itinerary instantly.
            </p>
          </div>
        ) : (
          // --- Plans List (Enhanced with Staggering) ---
          <motion.div 
            className="grid grid-cols-1 gap-8" // Removed flex-col wrapper, using grid for consistent spacing
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-400">
                Recently Generated Plans
            </h2>
            <AnimatePresence>
                {plans.map((plan) => (
                  <motion.div key={plan._id} variants={cardVariants}>
                    {/* PlanCard component is assumed to be the newly designed one */}
                    <PlanCard plan={plan} /> 
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Plan Form Modal */}
      {openModal && (
        <PlanForm
          onClose={() => setOpenModal(false)}
          onPlanCreated={() => {
            fetchPlans();
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
}