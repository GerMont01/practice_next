import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Pagination(props) {
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ pages, setPages ] = useState([1])
    const router = useRouter()
    
    const handelPage = (page) =>{
        setCurrentPage(page)
        if (page) {
            router.replace({
                query: { ...router.query, page },
            })
        }
    }

    useEffect(()=> {
        const { page } = router.query
        if (page) setCurrentPage(page)  
    },[router.query])

    useEffect (()=>{
        if (props.totalPages) {
            console.log("total pages: " + props.totalPages)
            const pagesArray = [ ...Array(props.totalPages).keys() ].map(i => i+1);
            setPages(pagesArray)
        }   
    },[props.totalPages])

    return (
        <div className="flex items-center justify-center w-full h-10\">
            {pages.length>0 && pages.map((page)=>
                <div className={`w-7 h-7 text-center ${currentPage.toString() === page.toString() ? 'bg-red-500' : 'bg-white'}`} key={page} onClick={()=>handelPage(page)}>
                    {page}
                </div>
            )}
        </div>
    )
}