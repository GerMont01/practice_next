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
        if (page) setCurrentPage(page)  
    },[searchParams])

    useEffect (()=>{
        const totalPages = props.totalPages
        setMaxElements(Math.ceil(totalPages/10))
        if (totalPages) {
            const arr = [ ...Array(totalPages).keys() ].map(i => i+1)
            setPagesArray(arr)
            setPages(arr.slice((currentElements-1)*10,currentElements*10))
        }   
    },[props.totalPages])

    useEffect(()=>{
        if (pagesArray.length>0) setPages(pagesArray.slice((currentElements-1)*10,currentElements*10))
    },[currentElements])

    const handleCurrentElements = (x) => {
        if (x === "next" && currentElements < maxElements) setCurrentElements(prev=>++prev)
        if (x === "prev" && currentElements > 1) setCurrentElements(prev=>--prev)
    }

    return (
        <div className="m-5 flex items-center justify-center w-full h-10\">
            {currentElements > 1 && 
                <div 
                    className={`w-10 h-10 p-2 text-center bg-white hover:cursor-pointer hover:shadow transition duration-200 hover:scale-105`} 
                    onClick={()=>handleCurrentElements("prev")}
                > {"<"} </div>
            }
            {pages.length>0 && pages.map((page)=>
                <div 
                    className={`w-10 h-10 p-2 text-center transition duration-200 hover:scale-105 hover:cursor-pointer hover:shadow ${currentPage.toString() === page.toString() ? 'bg-red-500' : 'bg-white'}`} 
                    key={page} 
                    onClick={()=>handelPage(page)}
                > {page} </div>
            )}
            {currentElements < maxElements && 
                <div 
                    className={`w-10 h-10 p-2 text-center transition duration-200 hover:scale-105 bg-white hover:cursor-pointer hover:shadow`} 
                    onClick={()=>handleCurrentElements("next")}
                > {">"} </div>
            }
        </div>
    )
}