import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBanner from "@/components/NoticeBanner";
import { Link } from "react-router-dom";

const categories = [
  {
    key: "hiking",
    title: "HIKING & TREKKING",
    desc:
      "Sepatu gunung, carrier, trekking pole, jaket waterproof, dan perlengkapan pendakian siap disewa untuk mendukung petualanganmu ke puncak.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    q: "hiking",
  },
  {
    key: "camping",
    title: "CAMPING",
    desc:
      "Tenda, sleeping bag, kursi lipat, dan perlengkapan masak outdoor tersedia untuk menemani perjalananmu di alam bebas.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    q: "camping",
  },
  {
    key: "expedition",
    title: "EXPEDITION (on process)",
    desc:
      "Peralatan ekspedisi lengkap mulai dari tenda dome, kompor portabel, alat navigasi, hingga carrier besar siap menemani penjelajahan ke alam bebas.",
    image:
      "https://images.unsplash.com/photo-1533122250115-6e3f9b2b3b09?q=80&w=1600&auto=format&fit=crop",
    q: "expedition",
  },
  {
    key: "travel",
    title: "TRAVEL & JOURNEY (on process)",
    desc:
      "Peralatan penunjang perjalanan seperti ransel dan perlengkapan pribadi agar setiap perjalananmu lebih praktis dan nyaman.",
    image:
      "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?q=80&w=1600&auto=format&fit=crop",
    q: "travel",
  },
];

export default function Featured() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <NoticeBanner showSearch={false} />

      {/* Hero banner */}
      <section
        className="relative h-[200px] md:h-[300px] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1920&auto=format&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl tracking-wide">Featured Category</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="pt-8 pb-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[12px] tracking-[3px] text-gray-700 mb-2">HELLO, OUTDOOR PEOPLES !</h2>
          <p className="text-[13px] md:text-[14px] text-gray-800">
            Kami memilih beberapa alat yang bisa menjadi referensi untuk para pegiat kreatif berdasarkan dengan kategorinya. Klik tautan pada gambar di bawah, sesuaikan dengan kategori dan kebutuhanmu.
          </p>
        </div>
      </section>

      {/* Cards */}
      <main className="flex-1 max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((c) => (
            <article key={c.key} className="border border-gray-200 bg-white">
              <Link to={`/products?q=${encodeURIComponent(c.q)}`}>
                <div
                  className="w-full h-[280px] md:h-[320px] bg-gray-200 bg-cover bg-center"
                  style={{
                    // Use multiple backgrounds: first try category image, then a generic fallback
                    backgroundImage: `url(${c.image}), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop)`,
                  }}
                  aria-label={c.title}
                />
              </Link>
              <div className="bg-[#ECECEC] px-5 py-3 border-t">
                <h3 className="text-[12px] tracking-[2px] text-black text-center">{c.title}</h3>
              </div>
              <div className="px-5 py-4 text-center">
                <p className="text-[13px] leading-relaxed text-gray-700">{c.desc}</p>
                <div className="mt-5 flex justify-center">
                  <Link
                    to={`/products?q=${encodeURIComponent(c.q)}`}
                    className="inline-block bg-black text-white px-5 py-2 text-[12px] tracking-[1px] hover:bg-gray-800"
                  >
                    Click here
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
