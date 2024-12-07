"use client"
import CartCounter from "@/components/cart_counter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items)
    const router = useRouter()

    const [ total, setTotal ] = useState()

    useEffect(()=>{
        setTotal(cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0))
    },[cartItems])

    return (
        <div className="container flex">
            <div className="w-4/6 h-full px-20 py-10 overflow-auto scrollbar-hide">
            {cartItems?.map(item=>(
                <div className="flex items-center px-6 py-4 bg-white border-b-gray-100 border-b-1" key={item.id}>
                    <img className="w-20 mb-4 cursor-pointer"src={item.picture} alt={item.name} onClick={()=>router.push(`/products/${item.id}`)}/>
                    <div className="w-10/12 m-4">
                        <h2 className="mb-4 text-base font-bold cursor-pointer hover:text-orange-400" onClick={()=>router.push(`/products/${item.id}`)}>{item.name}</h2>
                        <CartCounter device={item} cartPage={true}/>
                    </div>
                    <p className="w-1/12 font-bold text-red-600">${item.price}</p>
                </div>
            ))}
            </div>
            <div className="flex flex-col w-2/6 p-10 bg-white">
                <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
                <div className="flex justify-between mb-2"><p>Product Subtotal</p><p>${total}</p></div>
                <div className="flex justify-between mb-2"><p>Estimated Shipping</p><p>$0</p></div>
                <div className="flex justify-between mb-2"><p>Estimated Taxes</p><p>${(total*0.12).toFixed(2)}</p></div>
                <hr className="mb-2"></hr>
                <div className="flex justify-between mb-2 font-bold"><p>Estimated Total</p><p>${(total*1.12).toFixed(2)}</p></div>
                <button 
                    className="self-end px-3 py-2 mt-10 ml-auto text-sm font-semibold text-gray-800 bg-white border shadow rounded-xl hover:bg-orange-400"
                    onClick={()=>alert("Checking out")}
                    > Check out
                </button>
            </div>
        </div>
    )
}

export default Cart;

