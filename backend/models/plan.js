import mongoose from "mongoose";

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    travelDays: {
        type: Number,
        required: true
    },
    travelType: {
        type: String,
        enum: ["single", "family", "couple", "friends"], 
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    plan: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

export default mongoose.model("Plan", planSchema)


//  Generate a Travel plan for location: ${destination}, for ${travelDays} for ${travelType} with a cheap budget ${budget}, Give me a Hotels option list with HotelName, Hotel address, price, hotel image url, rating, description and suggest itineary with placeName, Place details, Place Image Url, Time travel each of location for 3 days with each day plan with the best time to visit in JSON format