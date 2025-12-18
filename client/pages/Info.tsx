import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBanner from "@/components/NoticeBanner";

export default function Info() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <NoticeBanner showSearch={false} />

      <main className="flex-1">
        {/* About Us */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 py-10">
          <h2 className="text-[14px] tracking-[2.3px] text-brand-gray-text mb-4">ABOUT US</h2>
          <p className="text-sm text-gray-800">Great place to rent hiking equipment</p>

          {/* Timeline */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>2015</span>
              <span>2025</span>
            </div>
            <input type="range" min={2015} max={2025} defaultValue={2025} className="w-full" />
            <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
              <span>Surabaya</span>
              <span>Next?</span>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop" alt="Hiking ridge" />
            <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop" alt="Camping tents" />
            <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" alt="Backpacking" />
          </div>
        </section>

        {/* Celebration */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 py-10">
          <h3 className="text-[14px] tracking-[2.3px] text-brand-gray-text mb-6">HIMAJO OUTDOOR CELEBRATION - 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <img key={i} className="w-full h-12 object-contain" src="https://dummyimage.com/100x48/efefef/aaa&text=Logo" alt={`Logo ${i + 1}`} />
              ))}
            </div>
            <img className="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1200&auto=format&fit=crop" alt="Celebration" />
          </div>
          <p className="text-sm text-gray-700 mt-4">Terima kasih kerjasama dengan berbagai project, vendor, dan berbagai pendidikan sepanjang tahun 2025. Nantikan program-event kami di tahun 2026. Stay update di social media.</p>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 py-10">
          <h3 className="text-[14px] tracking-[2.3px] text-brand-gray-text mb-6">TESTIMONIALS</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Fajar", title: "Wedding Videographer" },
              { name: "Dennis", title: "Product Shooting" },
              { name: "Chandra", title: "Preneed Surabaya" },
              { name: "Novi Farel", title: "Outdoor Specialist" },
            ].map((t, i) => (
              <article key={i} className="border border-gray-200 p-3">
                <img className="w-full h-36 object-cover" src={`https://i.pravatar.cc/300?img=${i + 10}`} alt={t.name} />
                <h4 className="mt-3 text-sm font-medium">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.title}</p>
                <p className="text-xs text-gray-700 mt-2">Peralatan lengkap, kondisi bagus, dan service ramah. Sangat membantu produksi dan perjalanan.</p>
              </article>
            ))}
          </div>
        </section>

        {/* Promo */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 py-10">
          <h3 className="text-[14px] tracking-[2.3px] text-brand-gray-text mb-6">PROMO</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="border border-gray-200">
              <img className="w-full h-40 object-cover" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop" alt="Promo 1" />
              <div className="p-4">
                <h4 className="font-medium">BOOK NOW - CASHBACK 50%</h4>
              </div>
            </article>
            <article className="border border-gray-200">
              <img className="w-full h-40 object-cover" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" alt="Promo 2" />
              <div className="p-4">
                <h4 className="font-medium">BOOK NOW - SEWA 3 BAYAR 2</h4>
              </div>
            </article>
          </div>
        </section>

        {/* Store */}
        <section className="bg-[#F5F5F5] py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div 
              className="w-full h-64 bg-gray-200 bg-cover bg-center mb-8"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1523742810063-4e9611a77d66?q=80&w=1600&auto=format&fit=crop), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop)`
              }}
              aria-label="Toko Himajo"
            />
            <h3 className="text-2xl">Store Surabaya</h3>
            <p className="text-xs text-gray-500 mt-6">Jl. A. Chandra Wiroguno 99, Ruko G</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
