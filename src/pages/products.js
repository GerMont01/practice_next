import { useEffect, useState } from "react"


export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('/api/products');
          const phones = await response.json();
          setProducts(phones)
        }
    
        fetchData();
      }, []);
    
    return (
        <div>
            <h1>Products</h1>
            <div className="products">
                {products && products.map((product,i)=>(
                    <div className="product">
                        <img key={i} src={product.url} className="w-11/12" alt={product.model}/>
                        <p className="m-5 text-center">{product.model}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}