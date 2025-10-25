"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="flex items-center justify-between px-7 py-3 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-pink-500">
            TripGenie
          </h1>
        </div>

        {/* Navbar Links */}
        <ul className="flex gap-10 text-gray-600 font-medium">
          <li className="hover:text-orange-500 cursor-pointer">Home</li>
          <li className="hover:text-orange-500 cursor-pointer">Destinations</li>
          <li className="hover:text-orange-500 cursor-pointer">About</li>
          <li className="hover:text-orange-500 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 h-screen">
        <div className="flex items-center justify-center flex-col h-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-pink-500 mb-4"
          >
            Your AI Travel Planner
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-600 text-lg max-w-xl mb-8"
          >
            Plan personalized trips effortlessly with TripGenie — your smart AI companion for unforgettable adventures.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/planner")}
            className="px-8 py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition"
          >
            Plan My Trip
          </motion.button>
        </div>
      </section>

      {/* Best Places Section */}
      <section className="mt-10 px-10">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          ✨ Best Places to Visit
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              img: "https://images.unsplash.com/photo-1548013146-72479768bada",
              title: "Paris, France",
              desc: "The city of lights, love, and art.",
            },
            {
              img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              title: "Maldives",
              desc: "Crystal clear waters and luxury resorts await.",
            },
            {
              img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
              title: "Tokyo, Japan",
              desc: "A perfect blend of technology and tradition.",
            },
          ].map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"
            >
              <img src={place.img} alt={place.title} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h4 className="text-xl font-semibold text-gray-800">{place.title}</h4>
                <p className="text-gray-500 text-sm mt-2">{place.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mt-28 px-10 pb-20 bg-gray-50 py-16">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">
          💬 What Our Users Say
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Aarav Mehta",
              text: "TripGenie made my Goa trip so seamless! The AI-generated plan covered everything I wanted.",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            {
              name: "Priya Sharma",
              text: "I loved how it customized the itinerary for a family vacation — super accurate and useful!",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Rohan Patel",
              text: "Saved me hours of planning! The budget breakdown and suggestions were on point.",
              img: "https://randomuser.me/api/portraits/men/33.jpg",
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center"
            >
              <img
                src={review.img}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 italic mb-3">“{review.text}”</p>
              <h4 className="font-semibold text-gray-800">{review.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 text-gray-500 text-sm">
        © {new Date().getFullYear()} TripGenie. All rights reserved.
      </footer>
    </div>
  );
}
