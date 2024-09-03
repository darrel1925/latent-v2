// components/Navbar/Navbar.tsx

import Link from "next/link";
import NavLink from "./NavLink";
import { CLIENT_ROUTE } from "@/constants/routes";

export default function Navbar() {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-white font-medium text-2xl">
            Patient Records
          </Link>
        </div>
        <div className="flex space-x-2">
          <NavLink label="Add new record" pathname={CLIENT_ROUTE.ADD} />
          <NavLink label="Search records" pathname={CLIENT_ROUTE.SEARCH} />
          <NavLink label="Necessity letter" pathname={CLIENT_ROUTE.LETTER} />
        </div>
      </div>
    </div>
  );
}
