"use client"
import { setCart } from "@/store/reducer";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Featured = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [device,setDevice] = useState()
    
    const fetchData = async (id) => {
        const response = await fetch(`/api/product_description?id=${id}`);
        const data = await response.json();
        setDevice(data)
    }

    const handleAddToCart = async () => { 
        const addItem = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(device),
        });
        const response = await addItem.json();
        dispatch(setCart({cart:response.cart,numOfItems:response.num_of_items}))
    }

    useEffect(()=>{
        fetchData("8807")
    },[])

    return (
        <div id="featured" className="flex justify-center w-full lg:h-[35vh] pt-1">
            {device ? (
                <div className="flex justify-center w-[95%] h-full py-10 my-6 bg-white rounded shadow-md lg:w-1/2">
                    <div className="flex flex-col pl-2 mr-10 w-[50%]">
                        <h1 className="italic">Featured product</h1>
                        <h1 className="mt-6 mb-4 font-bold lg:text-3xl">{device.name}</h1>
                        <p className="text-sm lg:text-[16px]">For  only ${device.price} *before tax</p>
                        <button 
                            className="w-32 px-3 py-2 mt-4 ml-auto text-sm font-semibold text-gray-800 bg-white border shadow rounded-2xl hover:bg-orange-400" 
                            onClick={handleAddToCart}
                            >Add to Cart
                        </button>
                    </div>
                    <img 
                        src={device.picture} 
                        className="pr-2 cursor-pointer h-5/6" 
                        alt={device.name} 
                        onClick={()=>router.push(`/products/${device.id}`)}
                    />
                </div>            
            ) : (
                <Spinner color="default"/>
            )}
        </div>
    )
    
}

export default Featured