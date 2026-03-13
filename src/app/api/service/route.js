import { authOptions } from "@/lib/authOptions";
import dbConnect, { colletionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async (req) => {

    const session = await getServerSession(authOptions)
    if (session) {
        const email = session?.user?.email
        const bookingCollection = dbConnect("booking")
        const result = await bookingCollection.find({ email }).toArray()

        return NextResponse.json(result)
    }
}

export const POST = async (req)=>{
    const body = await req.json();
    const bookingCollection= dbConnect("booking");
    const result= await bookingCollection.insertOne(body);

    return NextResponse.json(result);
}