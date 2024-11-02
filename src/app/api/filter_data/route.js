import { NextResponse } from "next/server"
import devices from "../devices.json"

export async function GET(req) {
    try {
        let phones = [...devices]

        const all_brands = [...new Set(phones.map(phone => phone.brand_name))]
        const all_os = [...new Set(phones.map(phone => phone.os))]
        const all_years = [...new Set(phones.map(phone => phone.released_at))]
        
        const response = {
            phones,
            all_brands,
            all_os,
            all_years
        }

        return NextResponse.json(response,{
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