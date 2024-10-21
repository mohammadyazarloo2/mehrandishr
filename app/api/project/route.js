import { NextResponse } from "next/server";
import {createHash} from 'crypto';
import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";


export async function POST(req){
    try{
        const {username,email,mobile,message}=await req.json();
        console.log("Received data:", { username, email, mobile, message });

        await connectMongoDB()
        console.log("Connected to MongoDB");
        await Project.create({username,email,mobile,message});

        return NextResponse.json({message:'project Created'},{status:201})
    }catch(error){
        return NextResponse.json({message:'an error accoured while creating the project'},{status:500})
    }
}