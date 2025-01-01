"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token"); // Check token presence
    console.log("Token present:", token); // Debug log
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes
    const handleStorageChange = () => {
      console.log("Storage changed!");
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    checkLoginStatus(); // Update state
    router.push("/"); // Redirect
  };

  return (
    <nav className="w-full p-2 px-4 bg-gray-100 border-b-2 text-zinc-800">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-medium font-serif">
          <Link href="/">StepCloser</Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link href="/goals" className="text-lg mx-2">
            Goals
          </Link>
          <Link href="/mygoals" className="text-lg mx-2">
            Your Goals
          </Link>
          <Link href="/create" className="text-lg mx-2">
            StartOne
          </Link>
          {isLoggedIn ? (
            <button
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/authenticate"
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
            >
              Sign In/Up
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Links (Mobile) */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 mt-4">
          <Link
            href="/goals"
            className="text-lg mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Goals
          </Link>
          <Link
            href="/mygoals"
            className="text-lg mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            My Goals
          </Link>
          <Link
            href="/create"
            className="text-lg mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            StartOne
          </Link>
          {isLoggedIn ? (
            <button
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/authenticate"
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In/Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
