"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function SideNavbar({ navLinks }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  return <>
    <button
      type="button"
      aria-label="Toggle navigation menu"
      aria-expanded={isSidebarOpen}
      onClick={() => setIsSidebarOpen((prev) => !prev)}
      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:opacity-80 md:hidden"
    >
      {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
    </button>

    {isSidebarOpen && (
      <div className="md:hidden">
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
        />

        <aside className="fixed inset-y-0 right-0 z-50 w-72 border-l border-slate-200 bg-white p-5 shadow-2xl">
          <div className="mb-6 flex items-center justify-end pr-3">
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-medium transition hover:opacity-80 ${
                  isActive
                    ? "bg-[#D1FAE5] text-green-800"
                    : "bg-[#ebf1f7] text-slate-800"
                }`}
              >
                {link.label}
              </Link>
              );
            })}
          </div>
        </aside>
      </div>
    )}
  </>
}