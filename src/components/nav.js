"use client"
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCart } from '@/store/reducer';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Image from "next/image";

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
            <Link href="/" className="h-4/5 lg:h-full"> 
                <Image
                    src={"/images/SuperMobileLogo.png"}
                    alt="Super Mobile Logo"
                    width={500}
                    height={500}
                    className="w-auto h-full"
                />
            </Link>
            <Link href="/about" className="link">About</Link>|
            <div className="relative" onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
                <Link href="/products" className="z-20 link">Products</Link>|
                {isOpen && 
                    <div className="absolute z-10 p-4 m-4 bg-white rounded shadow-sm lg:top-16 w-52">
                        <Link href="/products?type=Mobile" className="p-2 m-2 link">Mobiles</Link>
                        <Link href="/products?type=Smart+Watch" className="p-2 m-2 link">Smart Watches</Link>
                    </div>
                }
            </div>
            <Link href="/contact" className="link">Contact</Link>
            <div 
                className="absolute right-0 inline-block p-4 rounded cursor-pointer lg:m-4 hover:text-orange-400 lg:right-10"
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