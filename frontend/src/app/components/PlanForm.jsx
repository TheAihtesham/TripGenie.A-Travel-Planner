"use client";

import React, { useState } from "react";
import { createPlan } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function PlanForm({ onClose, onPlanCreated }) {
  const [form, setForm] = useState({
    name: "",
    source: "",
    destination: "",
    travelDays: "",
    travelType: "single",
    budget: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.source ||
      !form.destination ||
      !form.travelDays ||
      !form.travelType ||
      !form.budget
    ) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await createPlan({
        ...form,
        travelDays: Number(form.travelDays),
        budget: Number(form.budget),
      });
      onPlanCreated();
      setForm({
        name: "",
        source: "",
        destination: "",
        travelDays: "",
        travelType: "single",
        budget: "",
      });
      onClose();
    } catch (err) {
      alert(err.message || "Failed to create plan");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-blue-50/70 to-indigo-50/70 backdrop-blur-sm"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-lg bg-white/90 rounded-2xl shadow-xl border border-blue-100 p-8 backdrop-blur-lg"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-2">
            ✈️ Plan Your Next Adventure
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Fill in the details below to generate your AI-powered travel plan
          </p>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Trip Name */}
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Trip Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Source
                </label>
                <input
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  className="w-full mt-1 p-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Destination
                </label>
                <input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="e.g. Manali"
                  className="w-full mt-1 p-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Travel Days
                </label>
                <input
                  name="travelDays"
                  value={form.travelDays}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  type="number"
                  className="w-full mt-1 p-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Travel Type
                </label>
                <select
                  name="travelType"
                  value={form.travelType}
                  onChange={handleChange}
                  className="w-full mt-1 p-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all bg-white "
                >
                  <option value="single">Solo</option>
                  <option value="family">Family</option>
                  <option value="couple">Couple</option>
                  <option value="friends">Friends</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">
                Budget (₹)
              </label>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="e.g. 20000"
                type="number"
                className="w-full mt-1 p-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2.5 cursor-pointer text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-2.5 rounded-lg cursor-pointer text-white font-medium shadow-md transition-all duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Generating..." : "✨ Generate Plan"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
