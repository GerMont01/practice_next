import CartCounter from "@/components/cart_counter";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items)

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    return (
        <div>
            {cartItems?.map(item=>(
                <div>
                    <h1 className="mb-4 text-2xl font-bold">{item.name}</h1>
                    <img src={item.picture} alt={item.name} className="mb-4" />
                    <CartCounter device={item}/>
                </div>
            ))}
        </div>
    )
}

export default Cart;

