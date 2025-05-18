import React, { useState } from 'react';
import { ImagePlus, Menu, X } from 'lucide-react';

export default function ResponsiveHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-2">
              <ImagePlus className="text-blue-600" size={28} />
              <span className="font-bold text-xl text-gray-800">VisionAI</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#" isActive>Home</NavLink>
            <NavLink href="#">Analysis</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Contact</NavLink>
          </nav>
          
          {/* Login Button - Desktop */}
          <div className="hidden md:flex items-center">
            <button className="ml-4 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium">
              Login
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <MobileNavLink href="#" isActive>Home</MobileNavLink>
            <MobileNavLink href="#">Analysis</MobileNavLink>
            <MobileNavLink href="#">About</MobileNavLink>
            <MobileNavLink href="#">Contact</MobileNavLink>
            
            <div className="pt-4">
              <button className="w-full flex justify-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Desktop Navigation Link
function NavLink({ href, children, isActive = false }) {
  return (
    <a 
      href={href} 
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
        isActive 
          ? 'border-blue-500 text-gray-900' 
          : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
      } transition-colors duration-150`}
    >
      {children}
    </a>
  );
}

// Mobile Navigation Link
function MobileNavLink({ href, children, isActive = false }) {
  return (
    <a
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
      } transition-colors duration-150`}
    >
      {children}
    </a>
  );
}