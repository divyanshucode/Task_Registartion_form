import { UserContext } from "../../context/userContext"
import { useContext } from "react"

export default function Dashboard() {
    const {user} = useContext(UserContext)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Dashboard</h1>
        {!!user && (<h2 className="text-2xl text-gray-700">Hi {user.name}!</h2>) }
    </div>
  )
}

