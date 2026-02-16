import mongoose from "mongoose";

const BMISchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    height: Number,
    weight: Number,
    bmi: Number,
    category: String,
}, { timestamps: true });

export default mongoose.models.BMI || mongoose.model("BMI", BMISchema);