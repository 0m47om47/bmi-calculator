import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
export async function POST(req: Request){
    await dbConnect();
    const { email, password } = await req.json();
    if(!email || !password){
        return NextResponse.json(
            {error:"ALL fields required"},
            {status:400}
        );
    }
    const user=await User.findOne({email});
    if(!user){
        return NextResponse.json(
            {error:"User not found"},
            { status: 404}
        );
    }
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
        return NextResponse.json(
           {error:"Invalid password"},
           { status: 401} 
        );
    } 
    return NextResponse.json({
        message:"Login successful",
        user:{
            id: user._id,
            name: user.email,
        },
    });
    
}