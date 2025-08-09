import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        lessons: 0,
        reviews: 97,
        heap: 50
    });
}
