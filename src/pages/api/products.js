import devices from "./devices.json"

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            let phones = devices

            const { brand, os, year, sort, page } = req.query

            if (brand) phones = phones.filter(phone => phone.brand_name === brand); 
            if (os) phones = phones.filter(phone => phone.os === os); 
            if (year) phones = phones.filter(phone => phone.released_at.toString() === year);
            if (sort) {
                sort === "asc" ? phones.sort((a,b)=>a.name.localeCompare(b.name)) : phones.sort((a,b)=>b.name.localeCompare(a.name))
            }
            const total_products = phones.length

            const all_brands = [...new Set(phones.map(phone => phone.brand_name))]
            const all_os = [...new Set(phones.map(phone => phone.os))]
            const all_years = [...new Set(phones.map(phone => phone.released_at))]

            phones = phones.slice(((page||1)-1)*20,(page||1)*20)

            const response = {
                phones,
                total_products,
                all_brands,
                all_os,
                all_years
            }

            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }