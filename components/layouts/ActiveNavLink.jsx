"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveNavLink({
  href,
  children,
  className,
  activeClassName = "bg-[#D1FAE5] text-green-800",
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link className="contents" href={href}>
      <div className={`${className} ${isActive ? activeClassName : ""}`}>
        {children}
      </div>
    </Link>
  );
}
