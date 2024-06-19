import Filter from "@/components/filter";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Nav from "@/components/nav";
import Pagination from "@/components/pagination";

export default function Products() {
    const [products, setProducts] = useState([])
    const [ filterData, setFilterData ] = useState({
        all_brands: [],
        all_os: [],
        all_years: []
    }) 
    const [ productQty, setProductQty ] = useState(0)
    const router = useRouter();

    const fetchData = async () => {
        const params = router.query
        // const savedData = JSON.parse(localStorage.getItem("phones"))
        // const savedPhoneQty = JSON.parse(localStorage.getItem("phone_qty"))
        if (Object.keys(params).length === 0){
            // if (!savedData) {
                const response = await fetch(`/api/products?page=1`);
                const { phones, total_products, all_brands, all_os, all_years } = await response.json();
                // localStorage.setItem("data",JSON.stringify(response))
                // localStorage.setItem("phone_qty",JSON.stringify(total_products))
                setProducts(phones)
                setFilterData({all_brands,all_os,all_years})
                setProductQty(total_products)
            // } else {
            //     setProducts(savedData)
            //     setProductQty(savedPhoneQty)
            // }
        } else {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`/api/products?${queryString}`);
            const { phones, total_products, all_brands, all_os, all_years } = await response.json();
            setProducts(phones)
            setFilterData({all_brands,all_os,all_years})
            setProductQty(total_products)
        } 
        
    }

    useEffect(() => {
        fetchData();
      }, [router.query]);
    
    return (
        <div className="container max-w-full bg-gray-100">
            <Nav />
            <div className="flex w-full place-content-between">
                <Filter filters={filterData}/>
                <div className="products">
                {products && 
                <>
                    {products.map((product,i)=>(
                        <div className="product" key={i}>
                            <img src={product.picture} className="w-11/12" alt={product.name} onClick={()=>router.push(`/products/${product.id}`)}/>
                            <p className="h-8 m-2 text-sm text-center">{product.name}</p>
                        </div>
                    ))}
                    <Pagination totalPages={Math.ceil(productQty/20)} />
                </>
                }
                </div>
            </div>
        </div>
    )
}