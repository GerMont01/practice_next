import devices from "./devices.json"

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            let phones = [...devices]

            const { price, search, brand, os, year, sort, page } = req.query

            if (search) {
                phones = phones.filter(phone => phone.name.toLowerCase().includes(search.toLowerCase())); 
            } else {
                if (brand) phones = phones.filter(phone => phone.brand_name === brand); 
                if (os) phones = phones.filter(phone => phone.os === os); 
                if (year) phones = phones.filter(phone => phone.released_at.toString() === year);
                if (price){
                    switch (price) {
                        case "$0-199":
                            phones = phones.filter(phone => phone.price < 200);
                            break;
                        case "$200-399":
                            phones = phones.filter(phone => phone.price >= 200 && phone.price < 400);
                            break;
                        case "$400-599":
                            phones = phones.filter(phone => phone.price >= 400 && phone.price < 600);
                            break;
                        case ">$600":
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

            for (const phone of phones) {
                all_brands_set.add(phone.brand_name);
                all_os_set.add(phone.os);
                all_years_set.add(phone.released_at);
            }

            const all_brands = [...all_brands_set];
            const all_os = [...all_os_set];
            const all_years = [...all_years_set];
            
            const filters = {
                all_brands,
                all_os,
                all_years
            }

            phones = phones.slice(((page||1)-1)*20,(page||1)*20)

            const response = {
                phones,
                total_products,
                filters
            }

            res.status(200).json(response);
        } catch {
            return res.status(500).json({error:"Data could not be retrieved"});
        }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }