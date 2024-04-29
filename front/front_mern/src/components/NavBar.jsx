import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Newsletter from './Newsletter';
import Footer from './Footer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-semibold">win_cup</span>
            </div>
       
          </div>
          <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
            <div className='hidden md:block'>
          <div className="flex justify-center mt-4 mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
      </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

          <div className={`fixed inset-0 bg-gray-800 z-50 mt-16 lg:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              <a href="#" className="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-gray-300">Home</a>
              <a href="#" className="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-gray-300">About</a>
              <a href="#" className="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-gray-300">Services</a>
              <a href="#" className="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-gray-300">Contact</a>
              <div  className="flex justify-center mt-4 mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
            </div>
          </div>
      
    </nav>
    <Newsletter/>
    <Footer />
    </>
  );
};

export default Navbar;
