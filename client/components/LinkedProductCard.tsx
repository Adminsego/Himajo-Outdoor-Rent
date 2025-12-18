import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

type Props = {
  image: string;
  title: string;
  price: string;
  badge?: "New" | "Best Seller";
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/poffer/g, "puffer")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findSlugByTitle(title: string): string | undefined {
  const t = normalize(title);
  // 1) exact match
  const exact = products.find((p) => normalize(p.name) === t);
  if (exact) return exact.slug;
  // 2) contains either way
  const contain = products.find((p) => {
    const n = normalize(p.name);
    return n.includes(t) || t.includes(n);
  });
  return contain?.slug;
}

export default function LinkedProductCard(props: Props) {
  const slug = findSlugByTitle(props.title);
  const to = slug ? `/products/${slug}` : `/products?q=${encodeURIComponent(props.title)}`;
  return (
    <Link to={to} className="block w-full">
      <ProductCard {...props} />
    </Link>
  );
}
