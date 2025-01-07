import Link from "next/link";

const Footer = () => {
    return (
        <div className="flex w-full p-10 text-white bg-black h-50 justify-evenly">
            <div>
            <h3 className="text-lg font-bold text-orange-400">Contact</h3>
            <Link href="/contact" className="hover:text-orange-400">Contact Us</Link>
            </div>
            <div className="flex flex-col">
            <h3 className="text-lg font-bold text-orange-400">Products</h3>
            <Link href="/products?type=Mobile" className="hover:text-orange-400">Mobiles</Link>
            <Link href="/products?type=Smart+Watch" className="hover:text-orange-400">Smart Watches</Link>
            <Link href="/products?brand=Apple" className="hover:text-orange-400">Apple</Link>
            <Link href="/products?brand=Samsung" className="hover:text-orange-400">Samsung</Link>
            </div>
            <div>
            <h3 className="text-lg font-bold text-orange-400">About</h3>
            <Link href="/about" className="hover:text-orange-400">About Us</Link>
            </div>
        </div>
    )
}

export default Footer;