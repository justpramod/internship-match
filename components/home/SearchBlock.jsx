import SearchBar from "../SearchBar";

export default function SearchBlock() {
  return (
    <div className="flex justify-center pt-5 select-none">
      <div className="flex w-[90vw] flex-col gap-6 text-center md:w-[50vw]">
        <div className="text-3xl font-semibold text-slate-950">
          Find work that moves you forward
        </div>
        <SearchBar
          placeholder={"Search internships across roles,skills and sectors"}
        />

        <div className="px-8 text-slate-600">
          <p>
            InternMatch helps students discover relevant internship opportunities
            faster. Search open roles from companies, explore curated
            recommendations, and focus on opportunities that align with your
            profile.
          </p>
        </div>
      </div>
    </div>
  );
}
