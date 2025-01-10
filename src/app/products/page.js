"use client"
import Filter from "@/components/filter";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import {Spinner} from "@nextui-org/react";
import Pagination from "@/components/pagination";

export default function Products() {
    const [products, setProducts] = useState(undefined)
    const [allDevices,setAllDevices] = useState(undefined)
    const [ filterData, setFilterData ] = useState({
        all_brands: [],
        all_os: [],
        all_years: []
    }) 
    const [ productQty, setProductQty ] = useState(0)

    const router = useRouter()
    const searchParams = useSearchParams()

    const fetchData = async () => {
        if (searchParams.size===0){
            const response = await fetch(`/api/products?page=1`);
            const { phones, total_products, filters } = await response.json();
            setProducts(phones)
            setProductQty(total_products)
            setFilterData(filters)
        } else {
            const queryString = searchParams.toString()
            const response = await fetch(`/api/products?${queryString}`);
            const { phones, total_products, filters } = await response.json();
            setProducts(phones)
            setProductQty(total_products)
            setFilterData(filters)
        } 
    }

    const fetchAllDevices = async () => {
        const response = await fetch(`/api/get_all_devices`);
        const data = await response.json();
        setAllDevices(data)
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])

    useEffect(()=>{
        if (!allDevices) fetchAllDevices()
    },[])

    
    return (
        <Suspense >
            <div className="container h-full max-w-full bg-gray-100">
                <div className="flex flex-col w-full lg:flex-row place-content-between">
                    <Filter allDevices={allDevices} filters={filterData}/>
                    <div className="products">
                    {products !== undefined ? (
                        products.length > 0 ? ( 
                        <>
                            {products.map((product,i)=>(
                                <div className="product" key={i}>
                                    <div className="flex flex-col h-12 m-2 align-middle lg:m-6 justify-evenly">
                                        <p className="text-sm font-bold text-center">{product.name}</p>
                                        <p className="text-sm font-bold text-center">({product.released_at})</p>
                                    </div>
                                    <img 
                                        src={product.picture} 
                                        className="w-11/12" 
                                        alt={product.name} 
                                        onClick={()=>router.push(`/products/${product.id}`)}
                                    />
                                    
                                    <p className="mt-8 mb-2 text-sm font-bold text-center">$ {product.price}</p>
                                </div>
                            ))}
                            <Pagination totalPages={Math.ceil(productQty/20)} />
                        </>
                        ) : (
                            <div>
                                <p>No products match your search</p>
                            </div>
                        )):(
                        <div>
                            <Spinner color="default"/>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </Suspense>
    )
}