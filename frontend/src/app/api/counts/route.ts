import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json(
        {
            "wani": {
                lessons: 0,
                reviews: 97,
                heap: 50
            },
            "bun": {
                lessons: 15,
                reviews: 0,
                heap: 0
            }
        }
    );
}
