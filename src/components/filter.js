import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

export default function Filter(props) {
    const [ price,setPrice ] = useState("")
    const [ brand, setBrand ] = useState("")
    const [ os, setOs ] = useState("")
    const [ year, setYear ] = useState("")
    const [ sort, setSort ] = useState("")
    const [ deviceName, setDeviceName ] = useState("")
    const [ selectedDevice, setSelectedDevice ] = useState("")
    const sortOptions = ["price_low_to_high","price_high_to_low","model_asc","model_desc","release_year_asc","release_year_desc"]    

    const router = useRouter()

    const myFilter = (optionsValue, inputValue) => {
        if (inputValue === null) return
        if (inputValue.length === 0) {
          return
        }
        
        optionsValue = optionsValue.normalize("NFC").toLocaleLowerCase();
        inputValue = inputValue.normalize("NFC").toLocaleLowerCase();

        if (inputValue.length === 1) {
            return optionsValue[0] === inputValue;
        } else {
            return optionsValue.includes(inputValue);
        }    
    }

    const handleDeviceName = () => {
        if (selectedDevice) {
            router.replace({
                query: { search: selectedDevice, page: 1 },
            })
            setDeviceName(selectedDevice)
            setSelectedDevice(null)
        } else {
            if (deviceName) {
                router.replace({
                    query: { search: deviceName, page: 1 },
                })
            } 
        }
        setBrand("")
        setOs("")
        setSort("")
        setYear("")
        setPrice("")
    }
    const handleSelection = (e) => {
        setSelectedDevice(e)
    }

    const handleInputValue = (e) => {
        setDeviceName(e)
        if (!e) {
            const newQuery = router.query
            delete newQuery.search;
            router.replace({
                query: { ...newQuery, page: 1 },
            })
        }
    }

    const handleYearInput = (e) => {
        if (e.key ==="Backspace") {
            const newQuery = router.query
            delete newQuery.year;
            router.replace({
                query: { ...newQuery},
            })
            setYear("")
        }
    }

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
                query: { ...newQuery, page: 1 },
            })
        }
    }

    const handlePrice = (e) => {
        setPrice(e)
        if (e) {
            router.replace({
                query: { ...router.query, price: e, page: 1},
            })
        } else {
            const newQuery = router.query
            delete newQuery.price;
            router.replace({
                query: { ...newQuery, page: 1 },
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
                query: { ...newQuery, page: 1 },
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
                query: { ...newQuery, page: 1 },
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
                query: { ...newQuery, page: 1 },
            })
        }
    }

    const clearFilters = () =>{
        setPrice("")
        setBrand("")
        setDeviceName("")
        setOs("")
        setSelectedDevice(null)
        setSort("")
        setYear("")
        router.replace({
            query: { page: 1 },
        })
    }

    useEffect(()=> {
        const { search, sort, brand, os, year, price } = router.query

        if (search) setDeviceName(search)
        if (sort) setSort(sort)
        if (brand) setBrand(brand)
        if (os) setOs(os)
        if (year) setYear(year)       
        if (price) setPrice(price)   

    },[router.query])

    return (
        <div className="filter">
            {props.filters && props.allDevices &&
            <>
            <Autocomplete
                allowsCustomValue
                className="w-full"
                defaultFilter={myFilter}
                // defaultItems={props.allDevices || []}
                label="Search by name"
                menuTrigger="input"
                inputValue={deviceName}
                selectedKey={selectedDevice}
                onSelectionChange={handleSelection}
                onInputChange={handleInputValue}
                onClose={handleDeviceName}
                >
                {props.allDevices?.map((ele) => <AutocompleteItem key={ele}>{ele}</AutocompleteItem>)}
            </Autocomplete>

            <hr className="h-px py-px my-6 bg-gray-200 border-0"></hr>

            <h3 className="mb-2 ml-2 text-gray-500 font-inherit">Filters</h3>

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