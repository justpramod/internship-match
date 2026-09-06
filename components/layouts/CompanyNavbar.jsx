import Image from "next/image";
import Link from "next/link";
import SideNavbar from "./Sidebar";

const navLinks = [
  { href: "/company/dashboard", label: "Dashboard" },
  { href: "/company/internships", label: "Internships" },
  { href: "/company/profile", label: "Profile" },
];

export default function CompanyNavbar() {
  return (
    <nav className="sticky top-0 z-10 bg-[#f5f6fc] transition-all-300">
      {" "}
      <div className="flex justify-between py-5 px-4 md:px-8 select-none sticky items-center">
        <Link href="/company/dashboard" className="contents">
          {" "}
          <div className="relative aspect-[343/83] w-44 md:w-54">
            <Image
              src="/InternKaji.webp"
              alt="logo"
              loading="eager"
              fill
              sizes="(min-width: 6 vw) 33vw"
            />
          </div>
        </Link>
        <div className="hidden items-center gap-9 md:flex">
          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/company/dashboard">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-2 py-1  hover:underline transition-all duration-300 ease-in-out hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image
                    src="/dashboard-icon.svg"
                    alt="dashboard-icon"
                    fill
                  />{" "}
                </div>
                Dashboard
              </div>{" "}
            </Link>
          </div>

          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/company/internships">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-2 py-1  hover:underline transition-all duration-300 ease-in-out  hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image
                    src="/internships-icon.svg"
                    alt="internships-icon"
                    fill
                  />{" "}
                </div>
                Internships{" "}
              </div>{" "}
            </Link>
          </div>

          <div className="flex items-center">
            {" "}
            <Link className="contents" href="/company/profile">
              <div className="bg-[#ebf1f7] rounded-xl flex items-center gap-2 px-2 py-1  hover:underline transition-all duration-300 ease-in-out hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image src="/profile-icon.svg" alt="home-logo" fill />{" "}
                </div>
                Profile{" "}
              </div>
            </Link>
          </div>
        </div>
        <SideNavbar navLinks={navLinks} />
      </div>
    </nav>
  );
}
