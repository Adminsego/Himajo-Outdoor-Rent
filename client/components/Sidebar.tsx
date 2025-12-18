import { Minus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const categories = [
  "All",
  "Tas Carrier",
  "Tenda",
  "Sepatu",
  "Jaket",
  "Trekking pole",
  "Alat Memasak",
  "Lampu",
  "Lenses Sony",
  "Lenses Canon",
];

export default function Sidebar() {
  const [searchParams] = useSearchParams();
  const active = (searchParams.get("cat") ?? "All").toLowerCase();

  function hrefFor(category: string) {
    const next = new URLSearchParams(searchParams);
    if (category && category !== "All") next.set("cat", category);
    else next.delete("cat");
    return `/products?${next.toString()}`;
  }

  return (
    <aside className="w-full lg:w-[235px] bg-white p-5 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200">
      <div className="border-b border-black border-opacity-20 pb-5 mb-5">
        <h2 className="text-black text-[25px] font-normal leading-[31px]">
          Equipment
        </h2>
      </div>

      <div className="space-y-[15px]">
        <button className="flex items-center justify-between w-full text-left">
          <span className="text-black text-base">Category</span>
          <Minus className="w-5 h-5" />
        </button>

        <ul className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
          {categories.map((category) => {
            const isActive = active === category.toLowerCase();
            return (
              <li key={category}>
                <Link
                  to={hrefFor(category)}
                  className={`text-sm leading-[23px] hover:opacity-70 ${
                    isActive ? "text-brand-green" : "text-black"
                  }`}
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
