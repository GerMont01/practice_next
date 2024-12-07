import { setCart } from "@/store/reducer";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartCounter = (props) => {
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()
    const router = useRouter();
    const [ quantity,setQuantity ] = useState(0)

    const handleAddToCart = async () => { 
        const addItem = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.device),
        });
        const response = await addItem.json();
        console.log(response.cart)
        dispatch(setCart({cart:response.cart,numOfItems:response.num_of_items}))
        // dispatch(addToCart());
        alert(response.message)
    }

    const handleRemoveFromCart = async () => {
        const addItem = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.device.id),
        });
        const response = await addItem.json();
        dispatch(setCart({cart:response.cart,numOfItems:response.num_of_items}))
        alert(response.message)
    };

    useEffect(()=>{
        const currentElement = cartItems.find(item=>item.id===props.device.id)
        if (!currentElement) setQuantity(0)
        else if (currentElement.quantity >=0) setQuantity(currentElement.quantity)
    },[cartItems, props.device])

    return (
        <div>
        {quantity === 0 ? (
            <button 
                className="px-3 py-2 text-sm font-semibold text-gray-800 bg-white border shadow rounded-2xl hover:bg-orange-400" 
                onClick={handleAddToCart}
                >Add to Cart
            </button>
        ) : (
            <div className="flex items-center">
                <div className="flex items-center">
                    <button 
                        className="font-semibold text-gray-800 bg-white border rounded-full shadow w-7 h-7 hover:bg-orange-400"  
                        onClick={handleRemoveFromCart}
                        > -
                    </button>
                    <p className="m-2">{quantity}</p>
                    <button 
                        className="font-semibold text-gray-800 bg-white border rounded-full shadow w-7 h-7 hover:bg-orange-400" 
                        onClick={handleAddToCart}
                        > +
                    </button>
                </div>
                {!props.cartPage &&
                    <button 
                        className="p-1 m-2 text-sm font-semibold text-gray-800 h-7 hover:text-orange-400" 
                        onClick={()=>router.push(`/cart`)}
                    >Go to Cart
                    </button>
                }
            </div>
        )}
        </div>
    )
}


export default CartCounter;