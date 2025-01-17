import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { useRef } from 'react';

export default function Filter(props) {
    const [ price,setPrice ] = useState("")
    const [ brand, setBrand ] = useState("")
    const [ os, setOs ] = useState("")
    const [ year, setYear ] = useState("")
    const [ productType, setProductType ] = useState("")
    const [ sortItems, setSortItems ] = useState("")
    const [ deviceName, setDeviceName ] = useState("")
    const [ selectedDevice, setSelectedDevice ] = useState("")
    const sortOptions = ["price_low_to_high","price_high_to_low","model_asc","model_desc","release_year_asc","release_year_desc"]    
    const typeOptions = ["Mobile","Smart Watch"] 

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const autoCompleteRef = useRef(null);

    const myFilter = (optionsValue, inputValue) => {
        if (inputValue === null) return false
        if (inputValue.length <= 1) {
          return false
        }
        
        optionsValue = optionsValue.normalize("NFC").toLocaleLowerCase();
        inputValue = inputValue.normalize("NFC").toLocaleLowerCase();

        if (inputValue.length === 2) {
            return optionsValue.substring(0,2) === inputValue;
        } else if (inputValue.length > 2) {
            return optionsValue.includes(inputValue);
        }    
    }

    const handleSelection = (e) => {
        setSelectedDevice(e)
        const params = new URLSearchParams()
        if (e) {
            params.set("search", e)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        } else {
            params.delete("search")
            router.push(`${pathname}?${params}`)
        }
        setProductType("")
        setBrand("")
        setOs("")
        setSortItems("")
        setYear("")
        setPrice("")
    }

    const handleInputValue = (e) => {
        setDeviceName(e)
        setTimeout(()=>{
            autoCompleteRef.current.focus()
        },10)
        if (!e) {
            const params = new URLSearchParams()
            router.push(`${pathname}?${params}`)
            setProductType("")
            setBrand("")
            setOs("")
            setSortItems("")
            setYear("")
            setPrice("")
        }
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            const params = new URLSearchParams()
            params.set("search", deviceName)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        }
    }

    const handleYearInput = (e) => {
        if (e.key ==="Backspace") {
            const params = new URLSearchParams(searchParams.toString())
            params.delete("year")
            router.push(`${pathname}?${params}`)
            setYear("")
        }
    }

    const handleProductType = (e) => {
        setProductType(e)
        const params = new URLSearchParams(searchParams.toString())
        if (e) {
            params.set("type", e)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        } else {
            params.delete("type")
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        }
    }

    const handleSort = (e) => {
        setSortItems(e)
        const params = new URLSearchParams(searchParams.toString())
        if (e) {
            params.set("sort", e)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        } else {
            params.delete("sort")
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        }
    }

    const handlePrice = (e) => {
        setPrice(e)
        const params = new URLSearchParams(searchParams.toString())
        if (e) {
            params.set("price", e)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        } else {
            params.delete("price")
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        }
    }

    const handleBrand = (e) => {
        setBrand(e)
        const params = new URLSearchParams(searchParams.toString())
        if (e) {
            params.set("brand", e)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        } else {
            params.delete("brand")
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        }
    }

    const handleOs = (e) => {
        setOs(e)
        const params = new URLSearchParams(searchParams.toString())
        if (e) {
            params.set("os", e)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        } else {
            params.delete("os")
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        }
    }

    const handelYear = (e) => {
        setYear(e)
        const params = new URLSearchParams(searchParams.toString())
        if (e) {
            params.set("year", e)
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        } else {
            params.delete("year")
            params.set("page", 1)
            router.push(`${pathname}?${params}`)
        }
    }

    const clearFilters = () =>{
        setProductType("")
        setPrice("")
        setBrand("")
        setDeviceName("")
        setOs("")
        setSelectedDevice(null)
        setSortItems("")
        setYear("")
        router.push(`${pathname}?page=1`)
    }

    useEffect(()=> {
        if (searchParams) {

            const query = Object.fromEntries(searchParams)
            
            const { price, search, brand, os, year, sort, type } = query

            if (search) setDeviceName(search)
            if (type) setProductType(type)
            if (sort) setSortItems(sort)
            if (brand) setBrand(brand)
            if (os) setOs(os)
            if (year) setYear(year)       
            if (price) setPrice(price)   
        }
    },[searchParams])

    return (
        <div className="lg:filter">
            {props.filters && props.allDevices &&
            <>
            <Autocomplete
                allowsCustomValue
                className="w-full"
                defaultFilter={myFilter}
                label="Search by name"
                menuTrigger="input"
                selectedKey={selectedDevice}
                onSelectionChange={handleSelection}
                onInputChange={handleInputValue}
                onKeyDown={handleEnter}
                ref={autoCompleteRef}
                >
                {props.allDevices?.map((ele) => <AutocompleteItem key={ele}>{ele}</AutocompleteItem>)}
            </Autocomplete>

            <hr className="h-px py-px my-6 bg-gray-200 border-0"></hr>

            <h3 className="mb-2 ml-2 text-gray-500 font-inherit">Filters</h3>

            <Autocomplete 
                label="Sort by" 
                className="w-full"
                onClick={(e) => e.target.focus()}
                selectedKey={sortItems}
                onSelectionChange={handleSort}
            >
                {sortOptions?.map((ele) => (
                <AutocompleteItem key={ele} value={ele} >
                    {ele}
                </AutocompleteItem>
                ))}
            </Autocomplete>

            <Autocomplete 
                label="Product type" 
                className="w-full"
                onClick={(e) => e.target.focus()}
                selectedKey={productType}
                onSelectionChange={handleProductType}
            >
                {typeOptions?.map((ele) => (
                <AutocompleteItem key={ele} value={ele} >
                    {ele}
                </AutocompleteItem>
                ))}
            </Autocomplete>

            <Autocomplete 
                label="Brand" 
                className="w-full"
                onClick={(e) => e.target.focus()}
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
                onClick={(e) => e.target.focus()}
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
                onClick={(e) => e.target.focus()}
                selectedKey={year}
                onSelectionChange={handelYear}
                onKeyDown={handleYearInput}
            >
                {props.filters.all_years?.map((ele) => (
                <AutocompleteItem key={ele.toString()} value={ele.toString()} >
                    {ele.toString()}
                </AutocompleteItem>
                ))}
            </Autocomplete>

            <Autocomplete 
                label="Price ($)" 
                className="w-full"
                onClick={(e) => e.target.focus()}
                selectedKey={price}
                onSelectionChange={handlePrice}
            >
                {props.filters.all_prices?.map((ele) => (
                <AutocompleteItem key={ele} value={ele} >
                    {ele}
                </AutocompleteItem>
                ))}
            </Autocomplete>

            <hr className="h-px py-px my-6 bg-gray-200 border-0"></hr>
            <button className="font-inherit text-[0.940rem] flex items-center hover:bg-on-hover-gray text-gray-500 relative px-3 py-2 transition duration-150 ease-in-out shadow-sm cursor-pointer h-14 min-h-10 rounded-xl" onClick={clearFilters} type="button">Clear all</button>
        </>}
        </div>
    )
}