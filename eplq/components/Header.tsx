import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Image
          src="/logo.svg"
          alt="Saf-One Logo"
          width={40}
          height={40}
          className="mr-4 animate-spin-slow"
        />
        <h2 className="text-2xl font-semibold text-indigo-800">Saf-One</h2>
      </div>
    </header>
  )
}

