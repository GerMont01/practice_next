import Nav from "@/components/nav";

export default function Home() {
    return (
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Welcome to My Next.js Website</h1>
          <Nav />
          <p className="text-gray-600">This is the home page of my website.</p>
        </div>
      </div>
    )
  }