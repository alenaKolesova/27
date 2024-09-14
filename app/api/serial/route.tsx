import dbConnect from '@/lib/dbConnect'
import Serial from '@/models/Serial'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    await dbConnect()
    let serials = await Serial.find()
    return NextResponse.json(serials)
}

export async function POST(request: Request) {
    let serial = await request.json()

    if (!serial._id) serial._id = new mongoose.Types.ObjectId()

    await Serial.findByIdAndUpdate(serial._id, serial, { upsert: true })
    return NextResponse.json({
        'status': true
    })
}
