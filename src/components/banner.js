import Image from "next/image";
import applewatch from "../images/applewatch.jpg";
import Link from "next/link";

const Banner = () => {
    return (
        <div id="banner" className="flex justify-center w-full h-[55vh] text-white bg-black">
            <Image 
                src={applewatch} 
                className="object-cover w-1/3 h-5/6" 
                alt={"apple watch"} 
            />
            <div className="flex flex-col w-2/5 mx-20 my-10">
                <h1 className="mt-10 mb-4 text-4xl font-bold">Discover the Latest Mobile Phones at Unbeatable Prices!</h1>
                <p>Shop top brands like Apple, Samsung, Google, and more. Upgrade today and enjoy exclusive deals.</p>
                <Link 
                    className="w-32 px-3 py-2 mt-8 ml-auto text-sm font-semibold text-center text-gray-800 bg-white border shadow rounded-2xl hover:bg-orange-400" 
                    href={"/products"}
                    >Shop now
                </Link>
            </div>
        </div>
    )
    
}

export default Banner