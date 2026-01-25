import mongoose from "mongoose";
const BMISchema = new mongoose.Schema({
    height:Number,
    weight:Number,
    bmi:Number,
    category:String,
},
{timestamps:true});
export default mongoose.models.BMI || mongoose.model("BMI",BMISchema);