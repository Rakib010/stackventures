import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 fixed left-0 shadow-lg">
      <h1>Dashboard</h1>
      <nav>
        <Link
          href="/profile"
          className="block py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Profile
        </Link>

        <Link
          href="/settings"
          className="block py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Setting
        </Link>
      </nav>
    </aside>
  );
}
