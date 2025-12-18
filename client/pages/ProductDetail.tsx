import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBanner from "@/components/NoticeBanner";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/lib/products";
import { useEffect, useState } from "react";

function formatIDR(amount: number) {
  const s = Math.max(0, Math.floor(amount || 0)).toString();
  const withThousands = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "Rp" + withThousands + ",00";
}

export default function ProductDetail() {
  const { slug } = useParams();
  const localProduct = slug ? getProductBySlug(slug) : undefined;
  const [serverProduct, setServerProduct] = useState<
    | { id: number; slug: string; name: string; image?: string; price_idr: number; quantity?: number }
    | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        setServerProduct(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const product = serverProduct
    ? {
        name: serverProduct.name,
        image: serverProduct.image ?? (localProduct?.image || ""),
        price: formatIDR(serverProduct.price_idr),
      }
    : localProduct;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <NoticeBanner />
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <p className="text-sm text-gray-600">Product not found.</p>
          <Link to="/products" className="text-black underline mt-4 inline-block">Back to Products</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappText = encodeURIComponent(`Halo, saya tertarik menyewa ${product.name} (${product.price}). Apakah tersedia?`);
  const whatsappUrl = `https://wa.me/6281333571793?text=${whatsappText}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <NoticeBanner showSearch={false} />

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto object-contain border" />
        </div>
        <div>
          <nav className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:underline">Home</Link>
            <span> / </span>
            <Link to="/products" className="hover:underline">Products</Link>
            <span> / </span>
            <span className="text-black">{product.name}</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.price}</p>

          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
            Book on Whatsapp
          </a>

          <section className="mt-10 space-y-8">
            <div>
              <h2 className="text-sm tracking-widest text-gray-500 font-semibold mb-3">PRODUCT INFO</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Bali = Ready</li>
                <li>Bandung = Ready</li>
                <li>Surabaya = Ready</li>
                <li className="mt-2 text-gray-600">* Info deposit untuk non-member via WhatsApp</li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm tracking-widest text-gray-500 font-semibold mb-3">INCLUDE</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Fullset (detail tanya admin)</li>
                <li>Perlengkapan pendukung</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
