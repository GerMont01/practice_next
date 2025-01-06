"use client"
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCart } from '@/store/reducer';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Image from "next/image";
import supermobilelogo from "../images/SuperMobileLogo.png";

const Nav = () => {
    const numOfItems = useSelector((state) => state.cart.numOfItems)
    const dispatch = useDispatch()
    const router = useRouter();

    const [ fetched, setFetched ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)

    const fetchInitialState = async () => {
        const response = await fetch('/api/cart');
        const data = await response.json();
        dispatch(setCart({cart:data.cart,numOfItems:data.num_of_items}))
        setFetched(true)
    }
    useEffect(()=>{
        if (!fetched) fetchInitialState()
    },[])

    return (
        <nav className="relative nav">
            <Link href="/" className="h-full"> 
                <Image
                    src={supermobilelogo}
                    alt="Super Mobile Logo"
                    class="h-full w-auto"
                />
            </Link>
            <Link href="/about" className="link">About</Link>|
            <div className="relative" onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
                <Link href="/products" className="z-10 link">Products</Link>|
                {isOpen && 
                    <div className="absolute z-0 p-4 m-4 bg-white rounded shadow-sm top-16 w-52">
                        <Link href="/products?type=Mobile" className="p-2 m-2 link">Mobiles</Link>
                        <Link href="/products?type=Smart+Watch" className="p-2 m-2 link">Smart Watches</Link>
                    </div>
                }
            </div>
            <Link href="/contact" className="link">Contact</Link>
            <div 
                className="absolute inline-block p-4 m-4 rounded cursor-pointer hover:text-orange-400 right-10"
                onClick={()=>router.push(`/cart`)}
            >
                <ShoppingBagIcon className="size-6" />
                <p className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-center bg-red-400 border rounded-full top-1 right-2">
                    {numOfItems}
                </p>
            </div>
        </nav>
    )
}

export default Nav;