
import Link from "next/link";


export default async function FilterBar({ filter, search }) {

  const searchString = search ? `&search=${search}` : "";
  const navItems = [
    { name: 'All', href: `/admin/companies${searchString}` },
    { name: 'Pending', href: `/admin/companies?filter=pending${searchString}` },
    { name: 'Approved', href: `/admin/companies?filter=approved${searchString}` },
    { name: 'Rejected', href: `/admin/companies?filter=rejected${searchString}` },
    { name: 'Blacklisted', href: `/admin/companies?filter=blacklisted${searchString}` },
  ];
  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-gray-700   hover:underline ${item.name.toLowerCase() === filter ? 'font-medium text-green-500' : 'text-gray-600'} transition-all ease-in-out duration-200`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}