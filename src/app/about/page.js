import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col justify-center lg:container lg:flex-row">
      <div className="lg:w-[50%] p-2 lg:m-auto lg:pt-20 w-full text-sm lg:text-lg text-gray-600 mb-4">
        <p>
          At <strong>Super Mobile</strong>, we are passionate about connecting people to the technology that powers their lives. As a trusted online store for mobile phones and accessories, we strive to offer the latest smartphones, unbeatable deals, and an exceptional shopping experience for tech enthusiasts across the globe.
        </p>
        <p>
          We believe that everyone deserves access to cutting-edge technology, which is why we offer a wide range of devices at competitive prices. Whether you're looking for the newest flagship model, a budget-friendly option, or reliable accessories, Super Mobile has got you covered.
        </p>
        <p>
          Our mission is simple: to make technology accessible, affordable, and stress-free for our customers. With our user-friendly website, secure payment options, and dedicated customer support team, we’re here to help you find your perfect mobile device and make your shopping journey enjoyable.
        </p>
      </div>
      <div className="lg:w-[35%] w-full">
        <Image
          src={"/images/aboutuspic.jpg"}
          width={6000}
          height={4000}
          alt="Photo by Vitaly Gariev on Unsplash"
          className="lg:h-full h-[250px] object-cover"
        />
      </div>
    </div>
  )
}