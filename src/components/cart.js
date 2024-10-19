import { useEffect } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items)

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])
    return (
        <p className="absolute right-1">Cart</p>
    )
}

export default Cart;

