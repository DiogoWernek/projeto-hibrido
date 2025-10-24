import { Link } from "react-router-dom";

import Logo from "../assets/logo.svg"

export const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={Logo} alt="logo automax" className="max-h-12" />
            <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-700 transition-colors">
              Automax - Carrinhos
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}