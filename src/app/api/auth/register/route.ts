import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  dbConnect  from "@/lib/db";
import User from "@/models/user";

export async function POST(req: Request){
    await dbConnect();
    const {name , email , password } = await req.json();
    if (!name || !email || !password ){
        return NextResponse.json(
            {error: "all fields requred"},
            { status: 400}
        );
    }
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return NextResponse.json(
            {error:"user already exist"},
            {status:400}
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
await User.create({
    name,
    email,
    password:hashedPassword,
});
return NextResponse.json({message: "user registered successfully"});
}