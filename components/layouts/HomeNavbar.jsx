import Image from "next/image";
import Link from "next/link";

import SideNavbar from "./Sidebar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/register/student", label: "Register as student" },
  { href: "/register/company", label: "Register as company" },
];

export default function HomeNavbar() {


  return (
    <nav className="sticky top-0 z-10 border-b border-slate-200/70 bg-[#f7fafb]/85 backdrop-blur-md transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-5 select-none md:px-8">
        <Link href="/" className="contents">
          <div className="relative aspect-[343/83] w-44 md:w-54">
            <Image
              src="/internMatch-logo.png"
              alt="logo"
              loading="eager"
              width={1200}
              height={300}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 176px, 216px"
            />
          </div>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <div className="flex items-center">
            <Link className="contents" href="/login">
              <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-white hover:text-green-700 active:opacity-60">
                Login
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <Link className="contents" href="/register/student">
              <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-white hover:text-green-700 active:opacity-60">
                Register as student
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <Link className="contents" href="/register/company">
              <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-white transition hover:bg-green-800 active:opacity-60">
                Register as company
              </div>
            </Link>
          </div>
        </div>
        <SideNavbar navLinks={navLinks} />
      </div>


    </nav>
  );
}
