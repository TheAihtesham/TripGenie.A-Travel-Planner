"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Shield, Globe } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Home");

  const featureCards = [
    {
      icon: Zap,
      title: "Instant Itineraries",
      desc: "Get a full trip plan generated in seconds, tailored to your interests and timeline.",
    },
    {
      icon: Shield,
      title: "Smart Budgeting",
      desc: "AI-driven cost estimations and savings tips for a worry-free journey.",
    },
    {
      icon: Globe,
      title: "Personalized Picks",
      desc: "Receive unique recommendations for hidden gems, dining, and activities.",
    },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      let current = "Home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id") || "Home";
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 via-white to-amber-50 text-gray-800">
      <nav className="flex items-center justify-between px-8 py-4 sticky top-0 bg-white/70 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            router.push("/");
            scrollToSection("Home");
          }}
        >
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
            TripGenie
          </h1>
        </div>

        <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
          {["Home", "Destinations", "Features"].map((item) => (
            <li
              key={item}
              onClick={() =>
                item === "Home"
                  ? scrollToSection("Home")
                  : scrollToSection(item)
              }
              className={`cursor-pointer transition-colors ${
                activeSection === item
                  ? "text-orange-500 "
                  : "hover:text-orange-500"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        id="Home"
        className="flex flex-col items-center text-center h-screen px-6 py-28"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500 mb-6 leading-tight"
        >
          Your Smart AI Travel Planner -{" "}
          <span className="text-transparent underline bg-clip-text bg-linear-to-r from-orange-400 to-amber-300">
            TripGenie
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-lg md:text-xl max-w-2xl mb-10"
        >
          Discover, plan, and enjoy your next journey with personalized
          AI-powered travel recommendations tailored to your style.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => router.push("/planner")}
          className="px-10 py-3 cursor-pointer bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-transform"
        >
          Start Planning
        </motion.button>
      </section>

      {/* Destinations Section */}
      <section id="Destinations" className="px-8 py-20 bg-white">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
          🌍 Explore Top Destinations
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              img: "https://images.unsplash.com/photo-1548013146-72479768bada",
              title: "Paris, France",
              desc: "A timeless blend of romance, art, and architecture.",
            },
            {
              img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              title: "Maldives",
              desc: "Bask in the turquoise serenity of tropical luxury.",
            },
            {
              img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
              title: "Tokyo, Japan",
              desc: "Experience the harmony of innovation and tradition.",
            },
          ].map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
            >
              <img
                src={place.img}
                alt={place.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800">
                  {place.title}
                </h4>
                <p className="text-gray-500 text-sm mt-2">{place.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="Features"
        className="px-8 py-20 bg-linear-to-b from-white to-amber-50"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
          ⚡ Powered by AI, Made for You
        </h3>

        <div className="flex justify-center items-center flex-wrap gap-8 max-w-6xl mx-auto">
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center flex flex-col items-center hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-10 h-10 text-orange-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center px-8 py-20 bg-white border-t border-gray-100">
        <h3 className="text-4xl font-bold mb-4 text-gray-800">
          Ready to Plan Your Perfect Trip?
        </h3>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Stop scrolling, start exploring! Let TripGenie handle the details so
          you can enjoy the journey.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, rotate: -1 }}
          onClick={() => router.push("/planner")}
          className="px-12 py-4 text-xl cursor-pointer bg-linear-to-r from-orange-600 to-amber-600 text-white font-bold rounded-full shadow-2xl hover:shadow-orange-300/50 transition-transform duration-300 transform"
        >
          Create My Trip!
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200 text-gray-500 text-sm bg-white">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500 font-semibold">TripGenie</span>. All
        rights reserved.
      </footer>
    </div>
  );
}
