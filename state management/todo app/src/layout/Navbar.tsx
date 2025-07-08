import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          TaskApp
        </div>

        {/* Center: Links */}
        <div className="space-x-6 hidden md:flex font-semibold">
          <Link
            to="/task"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            Task
          </Link>
          <Link
            to="/user"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            User
          </Link>
        </div>

        {/* Right: Toggle */}
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
