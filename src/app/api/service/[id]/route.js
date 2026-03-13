import { authOptions } from '@/lib/authOptions';
import dbConnect, { colletionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    const p = await params;

    const serviceColletion = dbConnect(colletionNameObj.servicescoll);
    const data = await serviceColletion.findOne({ _id: new ObjectId(p.id) });
    return NextResponse.json(data);
}



export const DELETE = async (req, { params }) => {
    const bookingCollection = dbConnect("booking")
    const p = await params;
    const query = { _id: new ObjectId(p.id) }

    // Validation
    const session = await getServerSession(authOptions)
    const currentBooking = await bookingCollection.findOne(query)

    const isOwnerOK = session?.user?.email == currentBooking?.email;

    if (isOwnerOK) {
        const deleteResponse = await bookingCollection.deleteOne(query)
        revalidatePath("/my-bookings")
        return NextResponse.json(deleteResponse)
    }
    else {
        return NextResponse.json({ success: false, message: "Forbidden" })
    }
}



