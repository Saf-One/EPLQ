import Link from 'next/link'

export default function LoginOptions() {
  return (
    <div className="flex justify-center space-x-8">
      <LoginOption type="Admin" />
      <LoginOption type="User" />
    </div>
  )
}

function LoginOption({ type }: { type: 'Admin' | 'User' }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-64 transform hover:scale-105 transition-transform duration-300 animate-fade-in-up">
      <h3 className="text-2xl font-semibold mb-4 text-indigo-800">{type}</h3>
      <div className="space-y-4">
        <Link href={`/${type.toLowerCase()}/login`} className="block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">
          Login
        </Link>
        <Link href={`/${type.toLowerCase()}/register`} className="block w-full text-center border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-100 transition-colors">
          Register
        </Link>
      </div>
    </div>
  )
}

