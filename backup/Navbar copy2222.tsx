// import React, { useState, useEffect } from "react";
// import Link from "next/link";

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-transparent text-white py-3 px-6 flex items-center z-50">
//       {/* Nút mở menu */}
//       <button
//         className="bg-transparent text-gray-800 focus:outline-none"
//         onClick={toggleMenu}
//       >
//         <svg
//           className="w-8 h-8"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h16m-7 6h7"
//           ></path>
//         </svg>
//       </button>

//       {/* Dropdown Menu */}
//       {isClient && (
//         <ul
//           className={`absolute top-14 left-4 bg-white text-gray-800 shadow-lg rounded-md py-2 w-40 transition-all duration-300 ${
//             isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
//           }`}
//         >
//           <li className="px-4 py-2 hover:bg-blue-100">
//             <Link href="/" className="block">
//               Home
//             </Link>
//           </li>
//           <li className="px-4 py-2 hover:bg-blue-100">
//             <Link href="/learn" className="block">
//               Learn
//             </Link>
//           </li>
//           <li className="px-4 py-2 hover:bg-blue-100">
//             <Link href="/review" className="block">
//               Review
//             </Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Xử lý khi click ra ngoài menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 p-4 z-50">
      {/*<nav className="fixed top-0 left-0 w-full bg-transparent text-white py-3 px-6 flex items-center z-50"> */}

      {/* Nút mở menu */}
      <button
        className="ml-5 text-gray-800 bg-transparent px-4 py-2 rounded-md shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          ref={menuRef}
          className="absolute text-center text-green-600 left-5 mt-1 bg-white shadow-lg rounded-md py-2 w-22"
        >
          {[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn" },
            { label: "Review", href: "/review" },
          ].map((item, index) => (
            // <li key={index} className="px-4 py-2 hover:bg-blue-100">
            //   <Link href={item.href} onClick={() => setIsOpen(false)}>
            //     {item.label}
            //   </Link>
            // </li>
            // CÁCH PHÍA DƯỚI ÁP DỤNG ĐIỀU HƯỚNG CHO TOÀN BỘ THẺ LI THAY CHO CÁC TỪ TRONG THẺ LINK
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 w-full cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                window.location.href = item.href; // Điều hướng thủ công
              }}
            >
              <Link href={item.href} className="block w-full h-full text-center">
                {item.label}
              </Link>
            </li>

          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

