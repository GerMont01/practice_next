import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

export default function Filter(props) {
    const [ brand, setBrand ] = useState("")
    const [ os, setOs ] = useState("")
    const [ year, setYear ] = useState("")
    const [ sort, setSort ] = useState("")
    const [ allBrands, setAllBrands ] = useState([])
    const [ allOs, setAllOS ] = useState([])
    const [ allYears, setAllYears ] = useState([])
    const sortOptions = ["asc","desc"]    

    const router = useRouter()

    const handleSort = (e) => {
        setSort(e)
        if (e) {
            router.replace({
                query: { ...router.query, sort: e },
            })
        } else {
            const newQuery = router.query
            delete newQuery.sort;
            router.replace({
                query: { ...newQuery },
            })
        }
    }

    const handleBrand = (e) => {
        setBrand(e)
        if (e) {
            router.replace({
                query: { ...router.query, brand: e },
            })
        } else {
            const newQuery = router.query
            delete newQuery.brand;
            router.replace({
                query: { ...newQuery },
            })
        }
    }

    const handleOs = (e) => {
        setOs(e)
        if (e) {
            router.replace({
                query: { ...router.query, os: e },
            })
        } else {
            const newQuery = router.query
            delete newQuery.os;
            router.replace({
                query: { ...newQuery },
            })
        }
    }

    const handelYear = (e) => {
        setYear(e)
        if (e) {
            router.replace({
                query: { ...router.query, year: e },
            })
        } else {
            const newQuery = router.query
            delete newQuery.year;
            router.replace({
                query: { ...newQuery },
            })
        }
    }

    useEffect(()=>{
        const brandValues = props.allProducts.map(obj => obj.brand_name);
        setAllBrands([...new Set(brandValues)]);

        const osValues = props.allProducts.map(obj => obj.os);
        setAllOS([...new Set(osValues)]);

        const yearValues = props.allProducts.map(obj => obj.released_at);
        setAllYears([...new Set(yearValues)]);

    },[props.allProducts])

    useEffect(()=> {
        const { sort, brand, os, year } = router.query

        if (sort) setSort(sort)
        if (brand) setBrand(brand)
        if (os) setOs(os)
        if (year) setYear(year)       

    },[router.query])

    return (
        <div className="filter">

            <Autocomplete 
                label="Sort by name" 
                className="w-full"
                selectedKey={sort}
                onSelectionChange={handleSort}
            >
                {sortOptions?.map((ele) => (
                <AutocompleteItem key={ele} value={ele} >
                    {ele}
                </AutocompleteItem>
                ))}
            </Autocomplete>

            <Autocomplete 
                label="Brand" 
                className="w-full"
                selectedKey={brand}
                onSelectionChange={handleBrand}
            >
                {allBrands?.map((ele) => (
                <AutocompleteItem key={ele} value={ele} >
                    {ele}
                </AutocompleteItem>
                ))}
            </Autocomplete>

            <Autocomplete 
                label="OS" 
                className="w-full"
                selectedKey={os}
                onSelectionChange={handleOs}
            >
                {allOs?.map((ele) => (
                <AutocompleteItem key={ele} value={ele} >
                    {ele}
                </AutocompleteItem>
                ))}
            </Autocomplete>

            <Autocomplete 
                label="Release Year" 
                className="w-full"
                selectedKey={year}
                onSelectionChange={handelYear}
            >
                {allYears?.map((ele) => (
                <AutocompleteItem key={ele.toString()} value={ele.toString()} >
                    {ele.toString()}
                </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    )
}