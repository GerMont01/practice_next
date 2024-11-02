"use client"
import CartCounter from "@/components/cart_counter";
import { useSelector } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items)

    return (
        <div>
            {cartItems?.map(item=>(
                <div key={item.id}>
                    <h1 className="mb-4 text-2xl font-bold">{item.name}</h1>
                    <img src={item.picture} alt={item.name} className="mb-4" />
                    <CartCounter device={item}/>
                </div>
            ))}
        </div>
    )
}

export default Cart;

