let cartItems = [];

export default function handler(req, res) {

    const { method } = req

    switch (method) {
    
        case 'POST':
            const newItem = req.body
            cartItems.push(newItem)
            res.status(201).json({ message: 'Item added to cart', cart: cartItems })
            break
        case 'GET':
            res.status(200).json(cartItems)
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