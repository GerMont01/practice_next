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
        <div className="flex flex-col lg:container lg:flex-row">
            <div className="h-full p-5 overflow-auto lg:px-20 lg:py-10 lg:w-4/6 scrollbar-hide">
            {cartItems?.map(item=>(
                <div className="flex items-center px-6 py-4 bg-white border-b-gray-100 border-b-1" key={item.id}>
                    <img className="w-20 mb-4 cursor-pointer"src={item.picture} alt={item.name} onClick={()=>router.push(`/products/${item.id}`)}/>
                    <div className="w-8/12 m-4 lg:w-10/12">
                        <h2 className="mb-4 text-base font-bold cursor-pointer hover:text-orange-400" onClick={()=>router.push(`/products/${item.id}`)}>{item.name}</h2>
                        <CartCounter device={item} cartPage={true}/>
                    </div>
                    <p className="font-bold text-red-600 lg:w-1/12">${item.price}</p>
                </div>
            ))}
            </div>
            <div className="flex flex-col p-3 bg-white lg:p-10 lg:w-2/6">
                <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
                <div className="flex justify-between mb-2"><p>Product Subtotal</p><p>${total}</p></div>
                <div className="flex justify-between mb-2"><p>Estimated Shipping</p><p>$0</p></div>
                <div className="flex justify-between mb-2"><p>Estimated Taxes</p><p>${(total*0.12).toFixed(2)}</p></div>
                <hr className="mb-2"></hr>
                <div className="flex justify-between mb-2 font-bold"><p>Estimated Total</p><p>${(total*1.12).toFixed(2)}</p></div>
                <button 
                    className="self-end px-3 py-2 ml-auto text-sm font-semibold text-gray-800 bg-white border shadow lg:mt-10 rounded-xl hover:bg-orange-400"
                    onClick={()=>alert("Checking out")}
                    > Check out
                </button>
            </div>
        </div>
    )
}

export default Cart;

