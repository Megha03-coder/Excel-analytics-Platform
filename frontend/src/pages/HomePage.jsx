import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1612197584788-30d65ef43e30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black bg-opacity-50 text-white z-10">
        <div className="text-xl font-bold tracking-wide">Excel Analytics</div>
        <div className="space-x-4 hidden sm:block">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </nav>

      <motion.div
        className="h-full flex items-center justify-center px-4 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-2xl text-center shadow-2xl max-w-xl w-full">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Excel Analytics Platform
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Upload, analyze, and visualize your Excel data.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-lg shadow-md transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-green-700 px-6 py-2 rounded-full text-lg shadow-md transition"
            >
              Register
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
