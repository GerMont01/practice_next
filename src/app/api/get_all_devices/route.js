import { NextResponse } from "next/server";
import devices from "../devices.json"

export async function GET(req) {
        try {
            let phones = [...devices]

            phones = phones.map(phone => phone.name)

            return NextResponse.json(phones,{
                status: 200,
            });

        } catch (error) {
            return NextResponse.json(
                { error: error },
                {
                  status: 500,
                }
              );
        }
}