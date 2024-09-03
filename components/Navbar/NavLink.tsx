"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ label, pathname }: { label: string; pathname: string }) {
  const path = usePathname();
  const notSelectedStyle = "border-transparent";
  const selectedStyle = "border-gray-100 ";

  return (
    <Link
      href={pathname}
      className={`p-2 border-2 rounded-xl text-white hover:bg-gray-700  ${
        path === pathname ? selectedStyle : notSelectedStyle
      }`}
    >
      {label}
    </Link>
  );
}
