import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-700 text-white">
      <Link to="/" className="text-white text-lg hover:text-gray-300">Home</Link>
      <div className="space-x-4">
        <Link to="/register" className="text-white text-lg hover:text-gray-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Register</Link>
        <Link to="/login" className="text-white text-lg hover:text-gray-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Login</Link>
      </div>
    </nav>
  )
}