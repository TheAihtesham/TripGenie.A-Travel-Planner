import Plan from "../models/plan.js";
import fetch from "node-fetch";

const fetchUnsplashImage = async (query) => {
  try {
    const accessKey = process.env.UNSPLASH_API_KEY;
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${accessKey}&orientation=landscape`
    );
    const data = await res.json();
    return data.urls?.regular || null;
  } catch (err) {
    console.error("Unsplash fetch error:", err);
    return null;
  }
};

export const createPlan = async (req, res) => {
  try {
    const { name, source, destination, travelDays, travelType, budget } = req.body;

    if (!name || !source || !destination || !travelDays || !travelType || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const prompt = `
Generate a travel plan for ${destination} for ${travelDays} days for ${travelType} travelers with a budget of ₹${budget}.

1. Provide an array "hotels", each with:
   - HotelName (string)
   - Address (string)
   - Price (number)
   - Rating (number out of 5)
   - Description (string, max 150 characters)

2. Provide an array "itinerary" for each day, each day with:
   - Day (number)
   - Places (array), each with:
       - PlaceName (string)
       - PlaceDetails (string, max 150 characters)
       - BestTime (string)

**Important**: ONLY return valid JSON. No extra text, no markdown, no explanations.
`;

    const apiKey = process.env.GEMINI_API_KEY;
    const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
    let planData = null;
    let success = false;

    for (const model of models) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        try {
          const rawText = data.candidates[0].content.parts[0].text;
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (!jsonMatch) throw new Error("No valid JSON found in AI output");

          planData = JSON.parse(jsonMatch[0]);

          // Clean text
          const cleanObject = (obj) => {
            if (typeof obj === "string") return obj.replace(/[*`#>]+/g, "").trim();
            if (Array.isArray(obj)) return obj.map(cleanObject);
            if (obj && typeof obj === "object") {
              Object.keys(obj).forEach((key) => {
                obj[key] = cleanObject(obj[key]);
              });
            }
            return obj;
          };
          planData = cleanObject(planData);

          // Fetch images from Unsplash if not provided
          planData.hotels = await Promise.all(
            planData.hotels?.map(async (h) => ({
              HotelName: h.HotelName || "Unnamed Hotel",
              Address: h.Address || "Address unavailable",
              Price: h.Price || 0,
              ImageUrl:
                h.ImageUrl &&
                  h.ImageUrl.startsWith("http") &&
                  !h.ImageUrl.includes("example.com") &&
                  !h.ImageUrl.includes("dummy") &&
                  !h.ImageUrl.includes("placeholder")
                  ? h.ImageUrl
                  : await fetchUnsplashImage(`${h.HotelName} hotel ${destination}`),
              Rating: h.Rating || 4,
              Description: h.Description?.slice(0, 150) || "",
            })) || []
          );


          planData.itinerary = await Promise.all(
            planData.itinerary?.map(async (day) => ({
              Day: day.Day || 1,
              Places: await Promise.all(
                day.Places?.map(async (p) => ({
                  PlaceName: p.PlaceName || "Unnamed Place",
                  PlaceDetails: p.PlaceDetails?.slice(0, 150) || "",
                  PlaceImageUrl:
                    p.PlaceImageUrl && p.PlaceImageUrl.startsWith("http")
                      ? p.PlaceImageUrl
                      : await fetchUnsplashImage(`${p.PlaceName} ${destination} travel`),
                  BestTime: p.BestTime || "Anytime",
                })) || []
              ),
            })) || []
          );

          success = true;
          break;
        } catch (err) {
          console.error("JSON parse error:", err);
        }
      } else {
        console.error("Gemini API error:", data);
      }
    }

    if (!success) {
      return res.status(503).json({
        message: "AI models temporarily overloaded or returned invalid JSON. Try again later.",
      });
    }

    const newPlan = await Plan.create({
      name,
      source,
      destination,
      travelDays,
      travelType,
      budget,
      plan: planData,
    });

    res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Failed to generate travel plan", error: error.message });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (error) {
    console.error("Error fetching plan by ID:", error);
    res.status(500).json({ message: error.message });
  }
};
