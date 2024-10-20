import devices from "./devices.json"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            let phones = [...devices]

            phones = phones.map(phone => phone.name)
            // const all_os = [...new Set(phones.map(phone => phone.os))]
            // const all_years = [...new Set(phones.map(phone => phone.released_at))]
            
            // const response = {
            //     phones,
            //     all_brands,
            //     all_os,
            //     all_years
            // }

            res.status(200).json(phones);

        } catch {
            return res.status(500).json({error:"Data could not be retrieved"});
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}