import Filter from "@/components/filter";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Products() {
    const [products, setProducts] = useState([])
    const [ allProducts, setAllProducts ] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter();
    const brand = searchParams.get("brand")

    const fetchData = async () => {
        const params = router.query
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`/api/products?${queryString}`);
        const phones = await response.json();
        if (!brand) setAllProducts(phones)
        setProducts(phones)
    }

    useEffect(() => {
        fetchData();
      }, [brand]);
    
    return (
        <div className="container flex max-w-full bg-gray-100 place-content-between">
            <Filter allProducts={allProducts}/>
            <div className="products">
                {products && products.map((product,i)=>(
                    <div className="product" key={i}>
                        <img src={product.url} className="w-11/12" alt={product.model}/>
                        <p className="m-5 text-center">{product.model}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}