"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold">
        <Link href="/">Learn nextjs </Link>
      </div>
      <div className="flex space-x-6">
        <Link
          href="/products"
          className={`${
            pathname === "/products"
              ? "text-blue-500 font-semibold underline"
              : "text-white hover:underline"
          }`}
        >
          Product
        </Link>
        <Link
          href="/post"
          className={`${
            pathname === "/post"
              ? "text-blue-500 font-semibold underline"
              : "text-white hover:underline"
          }`}
        >
         Post
        </Link>
        <Link href="/gallery" className="hover:text-blue-400 transition">
          Gallery
        </Link>
        <Link href="/about" className="hover:text-blue-400 transition">
          About
        </Link>

        <Link href="/dashboard" className="hover:text-blue-400 transition">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
