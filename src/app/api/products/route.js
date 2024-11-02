import { NextResponse } from "next/server";
import devices from "../devices.json"

export async function GET(req) {
        try {
            let phones = [...devices]
            const { searchParams } = new URL(req.url);
            const query = Object.fromEntries(searchParams)
            
            const { price, search, brand, os, year, sort, page } = query

            if (search) {
                phones = phones.filter(phone => phone.name.toLowerCase().includes(search.toLowerCase())); 
            } else {
                if (brand) phones = phones.filter(phone => phone.brand_name === brand); 
                if (os) phones = phones.filter(phone => phone.os === os); 
                if (year) phones = phones.filter(phone => phone.released_at.toString() === year);
                if (price){
                    switch (price) {
                        case "0-199":
                            phones = phones.filter(phone => phone.price < 200);
                            break;
                        case "200-399":
                            phones = phones.filter(phone => phone.price >= 200 && phone.price < 400);
                            break;
                        case "400-599":
                            phones = phones.filter(phone => phone.price >= 400 && phone.price < 600);
                            break;
                        case ">600":
                            phones = phones.filter(phone => phone.price >= 600);
                            break;  
                        default:
                            break;
                    }
                    
                }
                if (sort){
                    switch (sort) {
                        case "price_low_to_high":
                            phones.sort((a,b)=>a.price - b.price)
                            break;
                        case "price_high_to_low":
                        phones.sort((a,b)=>b.price - a.price)
                            break;
                        case "model_asc":
                            phones.sort((a,b)=>a.name.localeCompare(b.name))
                            break;
                        case "model_desc":
                            phones.sort((a,b)=>b.name.localeCompare(a.name))
                            break;
                        case "release_year_asc":
                            phones.sort((a,b)=>a.released_at - b.released_at)
                            break;
                        case "release_year_desc":
                            phones.sort((a,b)=>b.released_at - a.released_at)
                            break;
                        default:
                            break;
                    }
                    
                }
            }

            const total_products = phones.length

            const all_brands_set = new Set();
            const all_os_set = new Set();
            const all_years_set = new Set();
            const all_prices_set = new Set();

            for (const phone of phones) {
                all_brands_set.add(phone.brand_name);
                all_os_set.add(phone.os);
                all_years_set.add(phone.released_at);
                if (phone.price < 200) {
                    all_prices_set.add("0-199")
                } else if (phone.price >= 200 && phone.price < 400) {
                    all_prices_set.add("200-399")
                } else if (phone.price >= 400 && phone.price < 600) {
                    all_prices_set.add("400-599")
                } else if (phone.price >= 600) {
                    all_prices_set.add(">600")
                }       
            }

            const all_brands = [...all_brands_set];
            const all_os = [...all_os_set];
            const all_years = [...all_years_set];
            const all_prices = [...all_prices_set]
            
            const filters = {
                all_brands,
                all_os,
                all_years,
                all_prices
            }

            phones = phones.slice(((page||1)-1)*20,(page||1)*20)

            const response = {
                phones,
                total_products,
                filters
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