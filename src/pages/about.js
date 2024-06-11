  export default function About() {
    return (
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4">About Us</h1>
          <nav>
            <a href="/" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 inline-block">Home</a> | 
            <a href="/about" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 inline-block">About</a> | 
            <a href="/contact" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 inline-block">Contact</a>
          </nav>
          <p className="text-gray-600">This is the about page of my website.</p>
        </div>
      </div>
    )
  }