import devices from "./devices.json"

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            let phones = [...devices]

            const { brand, os, year, sort, page } = req.query

            if (brand) phones = phones.filter(phone => phone.brand_name === brand); 
            if (os) phones = phones.filter(phone => phone.os === os); 
            if (year) phones = phones.filter(phone => phone.released_at.toString() === year);
            if (sort){
                switch (sort) {
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

            const total_products = phones.length

            phones = phones.slice(((page||1)-1)*20,(page||1)*20)

            const response = {
                phones,
                total_products
            }

            res.status(200).json(response);
        } catch {
            return res.status(500).json({error:"Data could not be retrieved"});
        }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }