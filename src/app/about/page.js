  import Nav from "@/components/nav"

  export default function About() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">About Us</h1>
          {/* <Nav /> */}
          <p className="text-gray-600">This is the about page of my website.</p>
        </div>
      </div>
    )
  }