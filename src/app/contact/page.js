"use client"
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResponse(data.message);
    setForm({ name: '', email: '', message: '' })
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/3 p-8 bg-white rounded shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 text-sm transition-all bg-gray-100 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-gray-200 h-14 placeholder:text-gray-500"
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 text-sm transition-all bg-gray-100 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-gray-200 h-14 placeholder:text-gray-500"
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full h-20 px-3 py-2 text-sm transition-all bg-gray-100 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-500"
              id="message"
              placeholder="Enter your message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            className="px-5 py-3 text-sm bg-white border shadow rounded-xl hover:bg-orange-400"
            type="submit"
          >
            Submit
          </button>
        </form>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
}