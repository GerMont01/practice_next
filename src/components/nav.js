import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCart } from '@/store/reducer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () =>{

    const cartItems = useSelector((state) => state.cart.items)
    const numOfItems = useSelector((state) => state.cart.numOfItems)
    const dispatch = useDispatch()
    const router = useRouter();

    const [ fetched, setFetched ] = useState(false)

    const fetchInitialState = async () => {
        const response = await fetch('/api/cart');
        const data = await response.json();
        dispatch(setCart({cart:data.cart,numOfItems:data.num_of_items}))
        setFetched(true)
        console.log("fetched cart")
    }
    useEffect(()=>{
        if (!fetched) fetchInitialState()
    },[])

    useEffect(()=>{
        console.log("num of items: ", numOfItems)
        console.log("cart items: ", cartItems)
    },[numOfItems,cartItems])

    return (
        <nav className="relative nav">
            <Link href="/" className="link">Home</Link>| 
            <Link href="/about" className="link">About</Link>|
            <Link href="/products" className="link">Products</Link>|
            <Link href="/contact" className="link">Contact</Link>| 
            <div 
                className="absolute inline-block p-4 m-4 rounded cursor-pointer hover:bg-blue-100 right-10"
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