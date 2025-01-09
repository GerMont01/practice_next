import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"

export default function Pagination(props) {
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ pages, setPages ] = useState([1])
    const [ currentElements, setCurrentElements ] = useState(1)
    const [ pagesArray, setPagesArray ] = useState([])
    const [ maxElements, setMaxElements ] = useState(1)

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    
    const handelPage = (page) =>{
        setCurrentPage(page)
        const params = new URLSearchParams(searchParams.toString())
        if (page) {
            params.set("page", page)
            router.push(`${pathname}?${params}`)
        }
    }

    useEffect(()=> {
        const page = searchParams.get("page")
        if (page) {
            setCurrentPage(page)  
            setCurrentElements(Math.trunc((page-1)/8)+1)
        }
    },[searchParams])

    useEffect (()=>{
        const totalPages = props.totalPages
        setMaxElements(Math.ceil(totalPages/8))
        if (totalPages) {
            const arr = [ ...Array(totalPages).keys() ].map(i => i+1)
            setPagesArray(arr)
            setPages(arr.slice((currentElements-1)*8,currentElements*8))
        }   
    },[props.totalPages])

    useEffect(()=>{
        if (pagesArray.length>0) setPages(pagesArray.slice((currentElements-1)*8,currentElements*8))
    },[currentElements])

    const handleCurrentElements = (x) => {
        if (x === "next" && currentElements < maxElements) setCurrentElements(prev=>++prev)
        if (x === "prev" && currentElements > 1) setCurrentElements(prev=>--prev)
    }

    return (
        <div className="flex items-center justify-center w-full m-5">
            {currentElements > 1 && 
                <div 
                    className={`rounded-l-md w-10 h-10 p-2 text-center bg-white hover:cursor-pointer hover:text-orange-400 transition duration-200`} 
                    onClick={()=>handleCurrentElements("prev")}
                > {"<"} </div>
            }
            {pages.length>0 && pages.map((page)=>
                <div 
                    className={`w-10 h-10 p-2 text-center transition duration-200 hover:cursor-pointer ${currentPage.toString() === page.toString() ? 'bg-orange-400' : 'bg-white hover:text-orange-400'}`} 
                    key={page} 
                    onClick={()=>handelPage(page)}
                > {page} </div>
            )}
            {currentElements < maxElements && 
                <div 
                    className={`rounded-r-md w-10 h-10 p-2 text-center transition duration-200 bg-white hover:cursor-pointer hover:text-orange-400`} 
                    onClick={()=>handleCurrentElements("next")}
                > {">"} </div>
            }
        </div>
    )
}