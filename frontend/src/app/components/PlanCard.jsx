"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlanCard({ plan }) {
  const { name, source, destination, travelDays, travelType, budget, plan: planData } = plan;
  const hotels = planData?.hotels || [];
  const itinerary = planData?.itinerary || [];

  const [openDay, setOpenDay] = useState(null);

  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index);
  };

  const fallbackImage = (type = "travel") =>
    `https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(type)}`; // Lighter fallback background

  // --- Design Enhancements: Color and Shadow Adjustment ---
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-10 hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        {/* Lighter primary color (text-indigo-600) and improved hierarchy */}
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-1 leading-tight">{name}</h2>
        
        <p className="text-gray-500 text-base font-medium">
          <span className="font-semibold text-gray-700">{source}</span> → <span className="font-semibold text-gray-700">{destination}</span>
        </p>

        <div className="mt-3 flex items-center flex-wrap gap-3 text-sm">
          {/* Lighter, softer badge colors */}
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider">
            {travelType.charAt(0).toUpperCase() + travelType.slice(1)} Trip
          </span>
          <span className="text-gray-600 font-bold flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.586.573-.99 1.077-1.077l.006-.007.472-.058a1 1 0 011.085.836l.254 1.493 1.42 1.879.376.498a.5.5 0 01-.002.692l-.426.426-1.547 1.547a1 1 0 01-1.414 0l-1.547-1.547-.426-.426a.5.5 0 01-.002-.692l.376-.498 1.42-1.879.254-1.493zm-3.6 5.86l.006.007c.504.087.922.586 1.077 1.077l.254 1.493 1.42 1.879.376.498a.5.5 0 01-.002.692l-.426.426-1.547 1.547a1 1 0 01-1.414 0l-1.547-1.547-.426-.426a.5.5 0 01-.002-.692l.376-.498 1.42-1.879.254-1.493zm-3.6-7.86l.006.007c.504.087.922.586 1.077 1.077l.254 1.493 1.42 1.879.376.498a.5.5 0 01-.002.692l-.426.426-1.547 1.547a1 1 0 01-1.414 0l-1.547-1.547-.426-.426a.5.5 0 01-.002-.692l.376-.498 1.42-1.879.254-1.493zM15.6 5.86l.006.007c.504.087.922.586 1.077 1.077l.254 1.493 1.42 1.879.376.498a.5.5 0 01-.002.692l-.426.426-1.547 1.547a1 1 0 01-1.414 0l-1.547-1.547-.426-.426a.5.5 0 01-.002-.692l.376-.498 1.42-1.879.254-1.493z"/>
            </svg>
            ₹{budget.toLocaleString()}
          </span>
          <span className="text-gray-600 font-bold flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {travelDays} Days
          </span>
        </div>
      </div>

      {/* Hotels */}
      {hotels.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             <span>Recommended Stays</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotels.map((hotel, idx) => (
              <div
                key={idx}
                // Use a subtle white background and sharper border radius
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
              >
                <img
                  src={hotel.ImageUrl || fallbackImage("hotel")}
                  alt={hotel.HotelName || "Hotel"}
                  className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-50"
                  loading="lazy"
                />
                <h4 className="text-gray-800 font-bold text-lg leading-tight truncate">
                  {hotel.HotelName || "Unnamed Hotel"}
                </h4>
                <p className="text-gray-500 text-xs mt-0.5 mb-2 line-clamp-1">{hotel.Address || "Address not available"}</p>
                <div className="text-sm text-gray-700 flex justify-between items-center pb-2 border-b border-gray-100">
                  <p className="flex items-center gap-1 font-semibold">
                     <span className="text-yellow-500 text-lg">★</span> {hotel.Rating || "N/A"} / 5
                  </p>
                  <p className="font-bold text-green-600">
                    ₹{hotel.Price?.toLocaleString() || "N/A"}
                    <span className="text-xs font-normal text-gray-500">/night</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500 pt-2 line-clamp-2">
                  {hotel.Description || "No description available."}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Itinerary */}
      {Array.isArray(itinerary) && itinerary.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>Detailed Itinerary</span>
          </h3>
          <div className="space-y-3">
            {itinerary.map((day, idx) => (
              <div
                key={idx}
                // Subtle shadow and lighter background on the card
                className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                {/* Header: Increased padding for better tap target and clear separation */}
                <button
                  onClick={() => toggleDay(idx)}
                  className="w-full flex justify-between items-center p-4 md:p-5 text-left bg-white hover:bg-gray-100 transition-colors duration-300"
                >
                  <h4 className="text-gray-800 font-extrabold text-lg flex items-center gap-3">
                     <span className="bg-indigo-50 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                        {day.Day || idx + 1}
                     </span>
                    Day {day.Day || idx + 1}
                  </h4>
                  <motion.span
                    animate={{ rotate: openDay === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 text-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.span>
                </button>

                {/* Expandable content */}
                <AnimatePresence>
                  {openDay === idx && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      style={{ transformOrigin: "top" }}
                      className="border-t border-gray-100 bg-gray-50 p-4 md:p-5 overflow-hidden"
                    >
                      {Array.isArray(day.Places) && day.Places.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5">
                          {day.Places.map((place, pIdx) => (
                            <motion.div
                              key={pIdx}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: pIdx * 0.08 }}
                              className="flex gap-4 items-start bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
                            >
                              <img
                                src={place.PlaceImageUrl || fallbackImage("place")}
                                alt={place.PlaceName}
                                className="w-24 h-24 object-cover rounded-md shadow-sm shrink-0" // Fixed size for clean look
                                loading="lazy"
                              />
                              <div className="grow">
                                <p className="font-bold text-gray-800 text-base">{place.PlaceName}</p>
                                <p className="text-sm text-gray-500 mt-0.5 mb-2 line-clamp-2">
                                  {place.PlaceDetails}
                                </p>
                                {/* Lighter, clearer badge for information */}
                                <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full">
                                  Ideal Time: {place.BestTime || "Anytime"}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm italic py-2 px-1">
                          No specific places listed for this day.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fallback */}
      {!hotels.length && (!Array.isArray(itinerary) || !itinerary.length) && (
        <div className="text-gray-500 text-sm italic mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-center">
            😔 The AI could not generate a structured hotel or itinerary plan for this trip.
          </p>
        </div>
      )}
    </div>
  );
}