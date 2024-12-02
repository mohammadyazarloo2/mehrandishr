import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";
import {createHash} from 'crypto';

export async function POST(req){
    try{
        const {name,parent,sub}=await req.json();

        await connectMongoDB()
        await Category.create({name,parent,sub});

        return NextResponse.json({message:'Category Created'},{status:201})
    }catch(error){
        return NextResponse.json({message:'an error accoured while creating the Category'},{status:500})
    }
}