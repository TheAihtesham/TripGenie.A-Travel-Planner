# TripGenie.AI – AI-Powered Travel Planner

**TripGenie.AI** is an intelligent travel planner web application that helps users plan trips efficiently. It generates personalized travel itineraries based on user preferences, budget, and travel type using AI-assisted suggestions.


## Features

- AI-powered personalized trip planning  
- Plan trips based on source, destination, duration, budget, and travel type  
- Interactive itinerary display  
- Separate frontend (React/Next.js) and backend (Node.js/Express)  
- MongoDB database for storing plans  
- Responsive design for mobile and desktop  


## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS, Framer Motion  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB / MongoDB Atlas  
- **AI:** Gemini AI  
- **Version Control:** Git, GitHub  

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/TheAihtesham/TripGenie.AI-Travel-Planner.git
cd Travel-Planner
```
### 2. Set up environmental variable

```bash
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_API_KEY=your_unsplash_key
```
### 3. Install dependencies

```bash
cd backend
npm install
# create .env file with your environment variables (MONGO_URI, PORT, etc.)
npm run dev


cd frontend
npm install
# create .env.local if needed
npm run dev
```

###  Screenshots

**Home Page**
<img width="1324" height="621" alt="image" src="https://github.com/user-attachments/assets/81c62195-0e7c-4412-80e9-90d00ffcaa1a" />


<img width="551" height="597" alt="image" src="https://github.com/user-attachments/assets/b5ff8a5b-3f31-4700-9463-ad7d5ecd1dd2" />

**Result**
<img width="1324" height="621" alt="image" src="https://github.com/user-attachments/assets/1a6f4a91-9154-4df7-813d-f4118eecaf76" />



###  How it works

- Open the app in a browser at http://localhost:3000.
- Fill in the trip details:
  Source & destination,
  Travel days,
  Travel type,
  Budget
- Click Generate Plan to get AI-suggested itinerary.

###  📄 License
- MIT
