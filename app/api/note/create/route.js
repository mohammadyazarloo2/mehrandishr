import NoteBook from "@/models/notebook";
import { NextResponse } from "next/server";
import {createHash} from 'crypto';
import { connectMongoDB } from "@/lib/mongodb";


export async function POST(req){
    try{
        const {title,textNote}=await req.json();

        await connectMongoDB()
        await NoteBook.create({title,textNote});

        return NextResponse.json({message:'note Created'},{status:201})
    }catch(error){
        return NextResponse.json({message:'an error accoured while creating the note'},{status:500})
    }
}