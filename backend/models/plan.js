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


