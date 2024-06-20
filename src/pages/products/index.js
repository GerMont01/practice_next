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
        if (Object.keys(params).length === 0){
            const response = await fetch(`/api/products?page=1`);
            const { phones, total_products } = await response.json();
            setProducts(phones)
            setProductQty(total_products)
        } else {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`/api/products?${queryString}`);
            const { phones, total_products } = await response.json();
            setProducts(phones)
            setProductQty(total_products)
        } 
        console.log("fetched data")
    }

    const fetchFilters = async () => {
        const response = await fetch(`/api/filter_data`);
        const data = await response.json();
        setFilterData(data)
    }

    useEffect(() => {
        fetchData()
    }, [router.query])

    useEffect(()=>{
        fetchFilters()
    },[])

    
    return (
        <div className="container max-w-full bg-gray-100">
            <Nav />
            <div className="flex w-full place-content-between">
                <Filter filters={filterData}/>
                <div className="products">
                {products?.length > 0 ? ( 
                <>
                    {products.map((product,i)=>(
                        <div className="product" key={i}>
                            <img 
                                src={product.picture} 
                                className="w-11/12" 
                                alt={product.name} 
                                onClick={()=>router.push(`/products/${product.id}`)}
                            />
                            <p className="h-12 m-2 text-sm text-center">{product.name} ({product.released_at})</p>
                        </div>
                    ))}
                    <Pagination totalPages={Math.ceil(productQty/20)} />
                </>
                ) : (
                    <div>
                        <p>No products match your search</p>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}