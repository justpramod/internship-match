import SearchBar from "../SearchBar";

export default function SearchBlock() {
  return (
    <div className="flex justify-center px-4 pt-12 select-none md:pt-16">
      <div className="flex w-full max-w-3xl flex-col gap-6 text-center">
        <div className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          Find work that moves you forward
        </div>
        <SearchBar
          placeholder={"Search internships across roles,skills and sectors"}
        />

        <div className="mx-auto max-w-2xl px-8 text-base leading-7 text-slate-600">
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
