import Header from './components/Header'
import LoginOptions from './components/LoginOptions'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800 animate-fade-in">
          Welcome to Saf-One EPLQ
        </h1>
        <p className="text-xl text-center mb-12 text-indigo-700 animate-slide-up">
          Efficient Privacy-Preserving Location-Based Queries
        </p>
        <LoginOptions />
      </main>
    </div>
  )
}

