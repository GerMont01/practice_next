import devices from "./devices.json"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            let phones = [...devices]
            const { id } = req.query

            const data = phones.find(phone=>phone.id===id)

            res.status(200).json(data);
        } catch {
            return res.status(500).json({error:"Data could not be retrieved"});
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}