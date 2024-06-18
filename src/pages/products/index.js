import Filter from "@/components/filter";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Products() {
    const [products, setProducts] = useState([])
    const router = useRouter();

    const fetchData = async () => {
        const params = router.query
        const savedData = JSON.parse(localStorage.getItem("data"))
        if (Object.keys(params).length === 0){
            if (!savedData) {
                const queryString = new URLSearchParams(params).toString();
                const response = await fetch(`/api/products?${queryString}`);
                const phones = await response.json();
                localStorage.setItem("data",JSON.stringify(phones))
                setProducts(phones)
            } else {
                setProducts(savedData)
            }
        } else {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`/api/products?${queryString}`);
            const phones = await response.json();
            setProducts(phones)
        } 
        
    }

    useEffect(() => {
        fetchData();
      }, [router.query]);
    
    return (
        <div className="container flex max-w-full bg-gray-100 place-content-between">
            <Filter allProducts={products}/>
            <div className="products">
                {products && products.map((product,i)=>(
                    <div className="product" key={i}>
                        <img src={product.picture} className="w-11/12" alt={product.name} onClick={()=>router.push(`/products/${product.id}`)}/>
                        <p className="h-8 m-2 text-sm text-center">{product.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}