import { NextResponse } from "next/server";
import devices from "../devices.json"

export async function GET(req) {
    try {
        let phones = [...devices]
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id")

        const data = phones.find(phone=>phone.id===id)

        return NextResponse.json(data,{
            status: 200,
        });
    } catch (error) {
        return NextResponse.json(
            { 
                error: error 
            },
            {
                status: 500,
            }
            );
    }
}