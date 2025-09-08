import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-800/20 rounded-3xl rotate-45 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-blue-800/20 rounded-2xl rotate-[30deg] animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-pink-800/20 rounded-2xl rotate-[-20deg] animate-pulse delay-500"></div>

      <header className="container mx-auto px-6 py-8 relative z-10 flex items-center justify-between">
        <div className="text-2xl font-bold">Kandid</div>
        <nav className="hidden md:flex space-x-8">
          <Link
            href="#features"
            className="hover:text-purple-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="hover:text-purple-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="hover:text-purple-400 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-20 relative z-10 flex flex-col items-center gap-16">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to the{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Experience innovation like never before. Join thousands of users
            transforming their workflow with our cutting-edge platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started →
            </Link>

            <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all">
            <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-300">
              Experience blazing fast performance with our optimized platform.
            </p>
          </div>

          <div className="bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all">
            <div className="w-14 h-14 bg-purple-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-300">
              Your data is protected with enterprise-grade security measures.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all">
            <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-300">
              Get deep insights with our powerful analytics dashboard.
            </p>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-gray-800 relative z-10 text-center text-gray-400">
        <p>&copy; 2024 Kandid. All rights reserved.</p>
      </footer>
    </div>
  );
}
