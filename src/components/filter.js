import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

export default function Filter(props) {
    const [ brand, setBrand ] = useState("")
    const [ os, setOs ] = useState("")
    const [ year, setYear ] = useState("")
    const [ sort, setSort ] = useState("")
    const sortOptions = ["model_asc","model_desc","release_year_asc","release_year_desc"]    

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
                query: { ...router.query, brand: e, page: 1 },
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
                query: { ...router.query, os: e, page: 1 },
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
                query: { ...router.query, year: e, page: 1 },
            })
        } else {
            const newQuery = router.query
            delete newQuery.year;
            router.replace({
                query: { ...newQuery },
            })
        }
    }

    useEffect(()=> {
        const { sort, brand, os, year } = router.query

        if (sort) setSort(sort)
        if (brand) setBrand(brand)
        if (os) setOs(os)
        if (year) setYear(year)       

    },[router.query])

    return (
        props.filters &&
        <div className="filter">
            <Autocomplete 
                label="Sort by" 
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
                {props.filters.all_brands?.map((ele) => (
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
                {props.filters.all_os?.map((ele) => (
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
                {props.filters.all_years?.map((ele) => (
                <AutocompleteItem key={ele.toString()} value={ele.toString()} >
                    {ele.toString()}
                </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    )
}