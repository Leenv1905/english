{/* Sử dụng absolute để tạo dropdown menu
      Không chèn vào nội dung khác */}
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed z-50">
      {/* <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50"></nav> */}
      <button
        className="bg-transparent text-gray-800 px-4 py-2 rounded-md mt-4 ml-4"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      {isClient && (
        <ul className={`absolute bg-white shadow-md list-none p-0 m-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
          <li className="my-2">
            <Link href="/">
              <span className="text-gray-800 no-underline">Home</span>
            </Link>
          </li>
          <li className="my-2">
            <Link href="/learn">
              <span className="text-gray-800 no-underline">Learn</span>
            </Link>
          </li>
          <li className="my-2">
            <Link href="/review">
              <span className="text-gray-800 no-underline">Review</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
