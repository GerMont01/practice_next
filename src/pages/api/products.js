import data from "./MOCK_DATA.json"

export default async function handler(req, res) {
    

    const fetchAndMergeData = async () => {
        let phones = [...data];
        const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        const json = await response.json()
        const elements = json.slice(0,100)
        phones = phones.map(phone => {
            const url = elements.find(ele => ele.id === phone.id).url
            return ({...phone, url})
        })
        return phones
    }

    if (req.method === 'GET') {
        try {
            let phones = await fetchAndMergeData()

            const { brand } = req.query

            if (brand) phones = phones.filter(phone => phone.brand === brand); 
            res.status(200).json(phones);
        } catch (error) {
            console.log(error)
        }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }