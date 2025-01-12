"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartCounter from "@/components/cart_counter";
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Product() {
    const pathname = usePathname()

    const [ device, setDevice ] = useState(undefined)
    const [ showDetails, setShowDetails ] = useState(false)
    
    const fetchData = async (id) => {
        const response = await fetch(`/api/product_description?id=${id}`);
        const data = await response.json();
        setDevice(data)
    }

    useEffect(()=>{
        if (pathname) fetchData(pathname.replace('/products/',''))
    },[pathname])

    return (
        <div className="max-w-full bg-gray-100 lg:container product_description">
            {device ? (
                <div className="flex flex-col h-full p-3 lg:p-10 lg:flex-row justify-evenly">     
                    <div className="flex flex-col items-center justify-center h-full lg:w-1/2">
                        <div className="w-full h-full lg:w-3/5">
                            <h1 className="mt-10 mb-4 text-2xl font-bold">{device.name}</h1>
                            <p><strong>Brand:</strong> {device.brand_name}</p>
                            <p><strong>Released At:</strong> {device.released_at}</p>
                            <p><strong>Body:</strong> {device.body}</p>
                            <p><strong>OS:</strong> {device.os}</p>
                            <p><strong>Storage:</strong> {device.storage}</p>
                            <p><strong>Display Size:</strong> {device.display_size}</p>
                            <p><strong>Display Resolution:</strong> {device.display_resolution}</p>
                            <p><strong>Camera Pixels:</strong> {device.camera_pixels}</p>
                            <p><strong>Video Pixels:</strong> {device.video_pixels}</p>
                            <p><strong>RAM:</strong> {device.ram}</p>
                            <p><strong>Chipset:</strong> {device.chipset}</p>
                            <p><strong>Battery Size:</strong> {device.battery_size}</p>
                            <p><strong>Battery Type:</strong> {device.battery_type}</p>
                            <div className="flex items-center mt-6 mb-3 cursor-pointer" onClick={()=>setShowDetails(prev=>!prev)}>
                                <h2 className="text-xl font-semibold hover:text-orange-400">More details</h2>
                                <ChevronDownIcon className="text-orange-400 size-6"/>
                            </div>
                            {showDetails &&
                                <ul className="overflow-auto list-disc h-36">
                                    {showDetails &&
                                        Object.entries(JSON.parse(device.specifications)).map(([key, value]) => (
                                            <li key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full p-8 bg-white lg:w-1/2">
                        <img className="w-2/5 mb-0 m-14" src={device.picture} alt={device.name}/>
                        <b className="m-4">${device.price}</b>
                        <CartCounter  className="w-2/5" device={device}/>
                    </div>
                </div>
            ) : (
                <div className="p-4">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    )
}