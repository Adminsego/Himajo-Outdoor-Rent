import { ChevronDown, Search } from "lucide-react";
import Header from "@/components/Header";
import NoticeBanner from "@/components/NoticeBanner";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products as localProducts } from "@/lib/products";

// use products from lib

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q")?.trim() ?? "";
  const [term, setTerm] = useState(q);
  const sortParam = searchParams.get("sort") ?? "relevant"; // relevant | price_asc | price_desc | name_asc | newest
  const minParam = searchParams.get("min") ?? "";
  const maxParam = searchParams.get("max") ?? "";
  const catParam = (searchParams.get("cat") ?? "All").toLowerCase();

  const [minPrice, setMinPrice] = useState(minParam);
  const [maxPrice, setMaxPrice] = useState(maxParam);
  const [sort, setSort] = useState(sortParam);
  const [serverProducts, setServerProducts] = useState<any[] | null>(null);

  function formatIDR(amount: number) {
    const s = Math.max(0, Math.floor(amount || 0)).toString();
    const withThousands = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp" + withThousands + ",00";
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        const mapped = (data || []).map((p: any) => ({
          slug: p.slug,
          name: p.name,
          price: formatIDR(p.price_idr),
          image: p.image ?? "",
          isBestSeller: !!p.is_best_seller,
          quantity: p.quantity ?? 0,
        }));
        setServerProducts(mapped);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function priceToNumber(price: string): number {
    // Convert e.g. "Rp250.000,00" -> 250000
    const digits = price.replace(/[^0-9]/g, "");
    return parseInt(digits || "0", 10);
  }

  function deriveCategory(name: string): string {
    const s = name.toLowerCase();
    if (/(carrier|osprey|backpack|tas)/.test(s)) return "tas carrier";
    if (/(tent|tenda|strombreak|magnum|karibu|equator)/.test(s)) return "tenda";
    if (/(shoe|shoes|sepatu|salomon|mamba|texapore)/.test(s)) return "sepatu";
    if (/(jacket|jaket|puffer|antora|wolfskin)/.test(s)) return "jaket";
    if (/(trekking pole|trekking|pole|valor)/.test(s)) return "trekking pole";
    if (/(cook|cooking|kettle|stove|kompor)/.test(s)) return "alat memasak";
    if (/(lamp|lantern|headlamp)/.test(s)) return "lampu";
    if (/(sony)/.test(s)) return "lenses sony";
    if (/(canon)/.test(s)) return "lenses canon";
    return "other";
  }

  function onPriceKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.currentTarget as HTMLInputElement;
      const val = target.value;
      if (target.name === "min") {
        onApplyFilters(val, undefined);
      } else if (target.name === "max") {
        onApplyFilters(undefined, val);
      } else {
        onApplyFilters();
      }
    }
  }

  function formatPriceForDisplay(v: string) {
    if (!v) return "";
    if (v.includes(",")) return v; // assume already formatted with decimals
    const digits = v.replace(/[^0-9]/g, "");
    if (!digits) return "";
    const withThousands = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return withThousands + ",00";
  }

  const filteredProducts = useMemo(() => {
    const base = serverProducts ?? localProducts;
    let list = base.map((p, idx) => ({ ...p, _idx: idx }));
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s));
    }
    if (catParam && catParam !== "all") {
      list = list.filter((p) => deriveCategory(p.name) === catParam);
    }
    const min = parseInt(minParam || "0", 10);
    const max = parseInt(maxParam || "0", 10);
    if (min) list = list.filter((p) => priceToNumber(p.price) >= min);
    if (max) list = list.filter((p) => priceToNumber(p.price) <= max);

    switch (sortParam) {
      case "price_asc":
        list.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
        break;
      case "price_desc":
        list.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
        break;
      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        list.sort((a, b) => b._idx - a._idx);
        break;
      default:
        break;
    }
    return list;
  }, [q, sortParam, minParam, maxParam, catParam, serverProducts]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = term.trim();
    const nextParams = new URLSearchParams(searchParams);
    if (next) nextParams.set("q", next);
    else nextParams.delete("q");
    setSearchParams(nextParams, { replace: false });
  }

  function onApplyFilters(nextMin?: string, nextMax?: string, nextSort?: string) {
    // Determine source values (prefer overrides)
    const displayMin = formatPriceForDisplay(nextMin ?? minPrice);
    const displayMax = formatPriceForDisplay(nextMax ?? maxPrice);
    if (displayMin !== minPrice) setMinPrice(displayMin);
    if (displayMax !== maxPrice) setMaxPrice(displayMax);

    const sp = nextSort ?? sort;
    const nextParams = new URLSearchParams(searchParams);
    // sort
    if (sp && sp !== "relevant") nextParams.set("sort", sp);
    else nextParams.delete("sort");
    // prices (numbers only)
    const min = displayMin.replace(/[^0-9]/g, "");
    const max = displayMax.replace(/[^0-9]/g, "");
    if (min) nextParams.set("min", min);
    else nextParams.delete("min");
    if (max) nextParams.set("max", max);
    else nextParams.delete("max");
    setSearchParams(nextParams, { replace: false });
  }

  function applySortValue(nextSort: string) {
    setSort(nextSort);
    const nextParams = new URLSearchParams(searchParams);
    if (nextSort && nextSort !== "relevant") nextParams.set("sort", nextSort);
    else nextParams.delete("sort");
    setSearchParams(nextParams, { replace: false });
  }
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <NoticeBanner />

      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 w-full">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
              {/* Left: price range */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Price:</span>
                <input
                  name="min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  inputMode="numeric"
                  placeholder="Min"
                  className="w-24 h-10 border border-black/60 px-2 text-sm"
                  onBlur={() => setMinPrice((v) => formatPriceForDisplay(v))}
                  onKeyDown={onPriceKeyDown}
                />
                <span className="text-gray-500">-</span>
                <input
                  name="max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  inputMode="numeric"
                  placeholder="Max"
                  className="w-24 h-10 border border-black/60 px-2 text-sm"
                  onBlur={() => setMaxPrice((v) => formatPriceForDisplay(v))}
                  onKeyDown={onPriceKeyDown}
                />
                <button onClick={() => onApplyFilters()} className="h-10 px-3 border border-black/60 text-sm hover:bg-gray-50">Apply</button>
              </div>

              {/* Right: search + sort */}
              <form onSubmit={onSubmit} className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="search"
                  placeholder="Search..."
                  className="w-full h-10 pl-10 pr-3 border border-black/60 focus:outline-none focus:ring-2 focus:ring-black/40"
                />
                <button type="submit" className="sr-only">Search</button>
              </form>
              <div className="relative">
                <div className="border border-black border-opacity-60 bg-white px-3 py-2 w-[220px] h-10 flex items-center justify-between">
                  <span className="text-black text-sm">Sort: </span>
                  <select
                    value={sort}
                    onChange={(e) => applySortValue(e.target.value)}
                    className="ml-2 bg-transparent outline-none text-sm"
                  >
                    <option value="relevant">Relevan</option>
                    <option value="price_asc">Harga Terendah</option>
                    <option value="price_desc">Harga Tertinggi</option>
                    <option value="name_asc">Nama A-Z</option>
                    <option value="newest">Terbaru</option>
                  </select>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 items-stretch">
              {filteredProducts.map((product) => (
                <Link key={product.slug} to={`/products/${product.slug}`} className="block w-full">
                  <ProductCard
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    badge={product.isBestSeller ? "Best Seller" : undefined}
                  />
                </Link>
              ))}
            </div>

            {q && filteredProducts.length === 0 && (
              <p className="text-sm text-gray-600 mt-4">No results for "{q}"</p>
            )}

            <div className="flex justify-center mt-12">
              <button className="border border-black px-11 py-2.5 text-black text-[14px] hover:bg-black hover:text-white transition-colors">
                Load More
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
