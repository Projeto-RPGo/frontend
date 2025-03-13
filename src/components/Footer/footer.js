"use client";
import { FaInstagram, FaGithub, FaTwitter, FaFacebook, FaGamepad } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-auto border-t border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center space-x-2 text-xl font-bold">
          <FaGamepad className="text-red-500" />
          <span>RPGo!</span>
        </div>
        <p className="text-sm mt-2">"Aventuras sem limites, mundos sem fronteiras!"</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 hover:text-pink-400 text-2xl" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-gray-400 text-2xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-500 hover:text-blue-400 text-2xl" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-700 hover:text-blue-600 text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
