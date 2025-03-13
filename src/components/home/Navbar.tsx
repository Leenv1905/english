import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import  {useRouter} from "next/router"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const accountMenuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Xử lý khi click ra ngoài menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setIsAccountMenuOpen(false);
    router.push("/"); // Điều hướng về trang chủ sau khi đăng xuất
    // Đây là 1 cách điều hướng của Next.js
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-white py-3 px-6 flex items-center justify-between z-50">
      {/* Nút mở menu */}
      <button
        className="text-gray-800 bg-transparent px-4 py-2 rounded-md shadow-md cursor-pointer"
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
          className="absolute mt-45 text-center text-green-600 left-2 bg-white shadow-lg rounded-md py-2 w-22 z-50"
        >
          {[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn" },
            { label: "Review", href: "/review" },
          ].map((item, index) => (
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

      {/* Nút Account */}
      <button
        className="text-gray-800 bg-transparent px-4 py-2 rounded-md shadow-md cursor-pointer ml-auto mr-4 z-50"
        onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
      >
        &#128100; {/* HTML symbol cho icon account */}
      </button>

      {/* Account Menu */}
      {isAccountMenuOpen && (
        <ul
          ref={accountMenuRef}
          className="absolute text-center text-green-600 right-5 mt-45 bg-white shadow-lg rounded-md py-2 w-22 z-50"
        >
          {isLoggedIn ? (
            <>
              <li
                className="px-4 py-2 hover:bg-blue-100 w-full cursor-pointer"
                onClick={() => {
                  setIsAccountMenuOpen(false);
                  window.location.href = "/user/account"; // Điều hướng thủ công
                }}
              >
                <Link href="/user/account" className="block w-full h-full text-center">
                  My Account
                </Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-blue-100 w-full cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                className="px-4 py-2 hover:bg-blue-100 w-full cursor-pointer"
                onClick={() => {
                  setIsAccountMenuOpen(false);
                  window.location.href = "/user/login"; // Điều hướng thủ công
                }}
              >
                <Link href="/user/login" className="block w-full h-full text-center">
                  Login
                </Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-blue-100 w-full cursor-pointer"
                onClick={() => {
                  setIsAccountMenuOpen(false);
                  window.location.href = "/user/register"; // Điều hướng thủ công
                }}
              >
                <Link href="/user/register" className="block w-full h-full text-center">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

