import devices from "./devices.json"

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            let phones = devices

            const { brand, os, year, sort } = req.query

            if (brand) phones = phones.filter(phone => phone.brand_name === brand); 
            if (os) phones = phones.filter(phone => phone.os === os); 
            if (year) phones = phones.filter(phone => phone.released_at.toString() === year);
            if (sort) {
                sort === "asc" ? phones.sort((a,b)=>a.name.localeCompare(b.name)) : phones.sort((a,b)=>b.name.localeCompare(a.name))
            }

            res.status(200).json(phones);
        } catch (error) {
            console.log(error)
        }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }