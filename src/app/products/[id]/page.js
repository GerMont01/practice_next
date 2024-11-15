"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartCounter from "@/components/cart_counter";

export default function Product() {
    const pathname = usePathname()

    const [ device, setDevice ] = useState(undefined)
    
    const fetchData = async (id) => {
        const response = await fetch(`/api/product_description?id=${id}`);
        const data = await response.json();
        setDevice(data)
    }

    useEffect(()=>{
        if (pathname) fetchData(pathname.replace('/products/',''))
    },[pathname])

    return (
        <div className="container h-screen max-w-full bg-gray-100 product_description">
            {device ? (
                <div className="flex p-10 h-4/5 justify-evenly">     
                    <div className="h-full">
                        <h1 className="mb-4 text-2xl font-bold">{device.name}</h1>
                        <img src={device.picture} alt={device.name} className="mb-4" />
                        <CartCounter device={device}/>
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
                    </div>
                    <div className="h-full">
                        <h2 className="mt-16 mb-12 text-xl font-semibold">Specifications:</h2>
                        <ul className="ml-6 overflow-auto list-disc h-5/6">
                            {Object.entries(JSON.parse(device.specifications)).map(([key, value]) => (
                            <li key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</li>
                            ))}
                        </ul>
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