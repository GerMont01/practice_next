  import Nav from "@/components/nav"

  export default function About() {
    return (
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4">About Us</h1>
          <Nav />
          <p className="text-gray-600">This is the about page of my website.</p>
        </div>
      </div>
    )
  }