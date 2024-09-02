// components/Navbar/Navbar.tsx

import Link from "next/link";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-white font-medium text-2xl">
            Patient Records
          </Link>
        </div>
        <div className="flex space-x-8">
          <NavLink label="Add new record" pathname="/add" />
          <NavLink label="Search records" pathname="/" />
        </div>
      </div>
    </div>
  );
}
