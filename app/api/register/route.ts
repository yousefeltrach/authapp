import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req : Request) {
    try{
        const {name, email, password} = await req.json();
        const hashPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();
        await User.create({name, email, password: hashPassword})

        return NextResponse.json({message: "user registered."},{status:201});

    } catch (error) {
         return NextResponse.json({message: "An error occured.", error},{status:500})
    }
    };