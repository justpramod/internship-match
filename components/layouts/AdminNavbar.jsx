import LogoutButton from "@/app/company/profile/components/LogoutButton";
import Image from "next/image";
import Link from "next/link";
export default function AdminNavbar() {
  return (
    <nav>
      {" "}
      <div className="flex flex-col gap-8  py-4 px-4 select-none items-start bg-white fixed left-0 top-0 h-screen w-72">
        <Link
          href="/admin/students"
          className="flex gap-1 items-center select-none"
        >
          {" "}
          <div className="w-[172px] shrink-0">
            <Image
              src="/internMatch-logo.png"
              alt="logo"
              loading="eager"
              width={1200}
              height={300}
              className="h-auto w-full object-contain"
              sizes="172px"
            />
          </div>
          <div className="text-[1.6rem] text-gray-800 font-semibold">Admin</div>
        </Link>
        <div className="flex flex-col items-start gap-6 w-full">
          <div className="flex items-center w-full">
            {" "}
            <Link className="contents" href="/admin/students">
              <div className="bg-[#ebf1f7]  rounded w-full flex items-center gap-2 px-2 py-2  hover:underline transition-all duration-300 ease-in-out hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image
                    src="/openings-icon.svg"
                    alt="student-icon"
                    fill
                  />{" "}
                </div>
                Students{" "}
              </div>{" "}
            </Link>
          </div>

          <div className="flex items-center w-full">
            {" "}
            <Link className="contents" href="/admin/companies">
              <div className="bg-[#ebf1f7] w-full rounded flex items-center gap-2 px-2 py-2  hover:underline transition-all duration-300 ease-in-out  hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image src="/company.svg" alt="company-icon" fill />{" "}
                </div>
                Companies{" "}
              </div>{" "}
            </Link>
          </div>

          <div className="flex items-center w-full">
            {" "}
            <Link className="contents" href="/admin/internships">
              <div className="bg-[#ebf1f7] w-full rounded flex items-center gap-2 px-2 py-2  hover:underline transition-all duration-300 ease-in-out hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image
                    src="/internships-icon.svg"
                    alt="internships-logo"
                    fill
                  />{" "}
                </div>
                Internships{" "}
              </div>
            </Link>
          </div>
          <div className="flex items-center w-full">
            {" "}
            <Link className="contents" href="/admin/sectors">
              <div className="bg-[#ebf1f7] w-full rounded flex items-center gap-2 px-2 py-2  hover:underline transition-all duration-300 ease-in-out  hover:opacity-80 active:opacity-60 ">
                {" "}
                <div className="relative h-4 w-4 ">
                  {" "}
                  <Image src="/sector-icon.svg" alt="sector-icon" fill />{" "}
                </div>
                Sectors{" "}
              </div>{" "}
            </Link>
          </div>
        </div>
        <div className="flex w-full justify-center bg-gray-200 rounded ">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
