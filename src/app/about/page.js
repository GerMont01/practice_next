import Image from "next/image";
import aboutuspic from "../../images/aboutuspic.jpg";

export default function About() {
  return (
    <div class="container flex justify-center">
      <div class="w-[50%] m-auto pt-20">
        <p class="text-lg text-gray-600 mb-4">
          At <strong>Super Mobile</strong>, we are passionate about connecting people to the technology that powers their lives. As a trusted online store for mobile phones and accessories, we strive to offer the latest smartphones, unbeatable deals, and an exceptional shopping experience for tech enthusiasts across the globe.
        </p>
        <p class="text-lg text-gray-600 mb-4">
          We believe that everyone deserves access to cutting-edge technology, which is why we offer a wide range of devices at competitive prices. Whether you're looking for the newest flagship model, a budget-friendly option, or reliable accessories, Super Mobile has got you covered.
        </p>
        <p class="text-lg text-gray-600">
          Our mission is simple: to make technology accessible, affordable, and stress-free for our customers. With our user-friendly website, secure payment options, and dedicated customer support team, we’re here to help you find your perfect mobile device and make your shopping journey enjoyable.
        </p>
      </div>
      <div className="w-[35%]">
        <Image
          src={aboutuspic}
          alt="Photo by Vitaly Gariev on Unsplash"
          class="h-full object-cover"
        />
      </div>
    </div>
  )
}