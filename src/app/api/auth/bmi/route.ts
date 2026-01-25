import dbConnect from "@/lib/db";
import BMI from "@/models/BMI";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        await dbConnect();
        const{height,weight,bmi,category}=await req.json();
        if(!height || !weight || !bmi || !category){
            return NextResponse.json(
                {error:"ALL fields required"},
                { status:404}
            );
        }
        await BMI.create({
            height,weight,bmi,category
        });
        return NextResponse.json({message:"BMI saved successfully",});
    }catch(error){
        console.log("bmi ka error",error);
        return NextResponse.json(
        {error:"Internal Server Error"},
        {status:500}
        );
    }
}