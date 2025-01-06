import Banner from "@/components/banner";
import Featured from "@/components/featured";
import Link from "next/link";

export default function Home() {
    return (
      <div className="flex flex-col items-center h-full bg-gray-100">
        <Banner/>
        <Featured/>
        <div class="py-20 w-full text-center flex flex-col items-center">
            <h2 class="text-3xl font-bold text-gray-800 mb-10">Why Shop With Us?</h2>
            <div class="w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>

                <h3 class="text-lg font-semibold text-gray-700">Free Shipping</h3>
                <p class="text-gray-600 text-sm">On All Orders</p>
              </div>

              <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>

                <h3 class="text-lg font-semibold text-gray-700">30-Day Guarantee</h3>
                <p class="text-gray-600 text-sm">Money-Back Guarantee</p>
              </div>

              <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>

                <h3 class="text-lg font-semibold text-gray-700">24/7 Support</h3>
                <p class="text-gray-600 text-sm">We’re Here Anytime</p>
              </div>

              <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>

                <h3 class="text-lg font-semibold text-gray-700">Secure Payments</h3>
                <p class="text-gray-600 text-sm">100% Protected</p>
              </div>
            </div>
        </div>
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
      </div>
    )
  }