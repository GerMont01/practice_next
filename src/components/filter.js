import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

export default function Filter(props) {
    const [ brand, setBrand ] = useState("")
    const [ allBrands, setAllBrands ] = useState([])

    const router = useRouter()

    const handleBrand = (e) => {
        setBrand(e)
        e ? (
            router.replace({
                query: { ...router.query, brand: e },
            })
        ) : (
            router.replace(router.pathname)
        )
    }

    useEffect(()=>{
        const brandValues = props.allProducts.map(obj => obj.brand);
        setAllBrands([...new Set(brandValues)])
    },[props.allProducts])

    return (
        <div className="filter">

            <Autocomplete 
                label="Brand" 
                className="w-full"
                selectedKey={brand}
                onSelectionChange={handleBrand}
            >
                {allBrands?.map((brand) => (
                <AutocompleteItem key={brand} value={brand} >
                    {brand}
                </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    )
}