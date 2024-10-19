let cartItems = [];

const getNumOfItems = () => {
    let num_of_items = 0
    for (let item of cartItems) {
        num_of_items += item.quantity
    }
    return num_of_items
}

export default function handler(req, res) {

    const { method } = req

    switch (method) {
    
        case 'POST':
            console.log("adding to cart...")
            const newItem = req.body

            const isInCar = () => {
                for (let item of cartItems) {
                    if (item.name === newItem.name) {
                        item.quantity +=1
                        return true
                    }
                }
                return false
            }

            const is_in_car = isInCar()

            if (!is_in_car) {
                newItem.quantity = 1
                cartItems.push(newItem)
            }
            
            res.status(201).json({ message: 'Item added to cart', cart: cartItems, num_of_items: getNumOfItems()})
            break
        case 'GET':
            res.status(200).json({cart:cartItems,num_of_items:getNumOfItems()})
            break
        case 'DELETE':
            const { id } = req.body
            cartItems = cartItems.filter(item => item.id !== id)
            res.status(200).json({ message: 'Item removed from cart', cart: cartItems })
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)

    }
}