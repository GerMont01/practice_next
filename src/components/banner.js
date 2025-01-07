import Image from "next/image";
import applewatch from "../images/applewatch.jpg";
import Link from "next/link";

const Banner = () => {
    return (
        <div id="banner" className="flex justify-center w-full lg:h-[55vh] text-white bg-black">
            <Image 
                src={applewatch} 
                className="object-cover w-[45%] lg:w-1/3 h-[160px] lg:h-5/6" 
                alt={"apple watch"} 
            />
            <div className="flex flex-col w-2/5 my-10 lg:mx-20">
                <h1 className="mt-10 mb-4 text-lg font-bold lg:text-4xl">Discover the Latest Mobile Phones at Unbeatable Prices!</h1>
                <p className="text-sm lg:text-lg">Shop top brands like Apple, Samsung, Google, and more. Upgrade today and enjoy exclusive deals.</p>
                <Link 
                    className="w-32 px-3 py-2 mt-4 ml-auto text-sm font-semibold text-center text-gray-800 bg-white border shadow mb:2 lg:mt-8 rounded-2xl hover:bg-orange-400" 
                    href={"/products"}
                    >Shop now
                </Link>
            </div>
        </div>
    )
    
}

export default Banner