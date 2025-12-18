import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import LinkedProductCard from "@/components/LinkedProductCard";
import ChatButton from "@/components/ChatButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Index() {
  const navigate = useNavigate();
  const [homeSearch, setHomeSearch] = useState("");
  const horizontalImages = [
    // 1 road desert
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    // 2 hills
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1600&auto=format&fit=crop",
    // 3 mountain (mountain specific)
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    // 4 forest trail
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    // 5 mountain (mountain specific)
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    // 6 lake
    "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?q=80&w=1600&auto=format&fit=crop",
    // 7 flowers
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1600&auto=format&fit=crop",
    // 8 sunset forest
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop",
    // 9 hiking group
    "https://images.unsplash.com/photo-1500534312132-8d7f0f1f9be0?q=80&w=1600&auto=format&fit=crop",
    // 10 mountain (mountain specific)
    "https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=1600&auto=format&fit=crop",
    // 11 valley
    "https://images.unsplash.com/photo-1500534318100-bbd95b1f49c7?q=80&w=1600&auto=format&fit=crop",
    // 12 mountain (mountain specific)
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
  ];

  function onHomeSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = homeSearch.trim();
    if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ChatButton />
      
      <main>
        <section className="relative bg-white py-8 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-[32px] md:text-[46px] leading-tight font-bold mb-6">
                Camping, Hiking<br />
                & Trail Running<br />
                Equipment Rental
              </h1>
              <p className="text-[13px] leading-relaxed text-gray-800 mb-8">
                Terimakasih sudah mendukung langkah awal kami dalam merintis
                usaha persewaan alat mendaki. Meskipun baru berdiri,
                kami berkomitmen memberikan pelayanan terbaik bagi para
                pendaki di Jawa Timur. Nikmati layanan free delivery, ketersediaan
                alat mendaki yang lengkap. Mari bersama menapaki jejak
                petualangan baru dengan perlengkapan terbaik.
              </p>
              <a href="#featured" className="text-[12px] font-bold underline hover:text-gray-600 transition-colors">
                Himajo Outdoor &gt;
              </a>
            </div>
            <div className="relative order-first lg:order-last">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/5339da8c5a89287c5d4614f1a47ee148585d1ce5?width=922"
                alt="Camping tent"
                className="w-full rounded-lg shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </section>

        

        <section className="bg-brand-gray-medium py-6">
          <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/484ba0fd7baf3f6ff6e7409d16a0dc9c4f25f457?width=106"
                alt="Icon"
                className="w-[53px] h-[46px]"
              />
              <p className="text-[14px]">
                Tenda, Tas, Sepatu, Tracking Pool, Jaket, etc/
                <span className="font-bold">Klik Selengkapnya</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <form onSubmit={onHomeSearchSubmit} className="relative hidden md:block">
                <input
                  value={homeSearch}
                  onChange={(e) => setHomeSearch(e.target.value)}
                  type="search"
                  placeholder="Search..."
                  className="w-80 border border-gray-300 px-4 py-2 pr-10 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-3 bg-black text-white hover:bg-gray-800 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="w-full">
            <div className="h-44 md:h-56 marquee">
              <div className="marquee-track items-center gap-2">
                {[...horizontalImages, ...horizontalImages].map((src, i) => (
                  <img
                    key={`loop-a-${i}`}
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="h-40 md:h-48 w-auto object-cover inline-block"
                  />
                ))}
                {[...horizontalImages, ...horizontalImages].map((src, i) => (
                  <img
                    key={`loop-b-${i}`}
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="h-40 md:h-48 w-auto object-cover inline-block"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-12">
              <div className="border-t border-[#E8E6E6] mb-4"></div>
              <h2 className="text-[14px] tracking-[2.3px] text-brand-gray-text">FEATURED EQUIPMENT</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/208be56710a2d115cd501138320e25c246ad53eb?width=310"
                title="The North Face Mountain Jacket"
                price="Rp250.000,00"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/5c688e440a665e556917aa56c0fa24da4bbe6e69?width=290"
                title="Eiger Tigerclaw 2.5"
                price="Rp250.000,00"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/9dd6db6f4fee10ae825e21667c78783fa855e9b3?width=320"
                title="The North Face Antora Jacket"
                price="Rp250.000,00"
                badge="Best Seller"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/fcfff940210e8df6edbf64e250c8a7c182a05ed6?width=270"
                title="The North Face Poffer Jacket"
                price="Rp200.000,00"
                badge="Best Seller"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/f4031290ad76769b9bddf209c8a708f7fac5e776?width=314"
                title="Jack Wolfskin Texapore shoes"
                price="Rp200.000,00"
                badge="Best Seller"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-12">
              <div className="border-t border-[#E8E6E6] mb-4"></div>
              <h2 className="text-[14px] tracking-[2.3px] text-brand-gray-text">HIKING GEAR</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/ccb0f76ee71dc5e537c6a22c8727913576481a49?width=260"
                title="Tiger Across 1.0 Windproof"
                price="Rp150.000,00"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/db36a2773649881024d87525c788cc4e05a08c73?width=248"
                title="Eiger Finder Insulation Jacket"
                price="Rp150.000,00"
                badge="New"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/e120df6f38866ede81318d26d74ae838d8cbae0f?width=270"
                title="Jack Wolfskin Chiliy Morning"
                price="Rp250.000,00"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/acb1227dd6f01a3a7642d032ae9f870f54a1027e?width=320"
                title="Eiger Monocle 350"
                price="Rp100.000,00"
                badge="New"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/a7dad69afae7a8a6bd3791278812ebbd75ce7fe3?width=326"
                title="Eiger Stroll Section 3"
                price="Rp100.000,00"
                badge="New"
              />
            </div>
            
            <div className="text-center">
              <Link to="/products" className="inline-block bg-black text-white px-8 py-3 text-[12px] tracking-[1.3px]">
                CLICK MORE
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-12">
              <div className="border-t border-[#E8E6E6] mb-4"></div>
              <h2 className="text-[14px] tracking-[2.3px] text-brand-gray-text">Outdoor Cooking Gear</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/bb1f49877412f34c45c5119436dc85dc08f17206?width=336"
                title="Eiger Inferno Stove"
                price="Rp200.000,00"
                badge="Best Seller"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/471e407177b3d320a08de26b3e6db578f0a921ef?width=214"
                title="Eiger Campfire Stove"
                price="Rp50.000,00"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/6df4187d4279167c8ebc8bcdf34fe129b4cb0c71?width=276"
                title="Consina Kettle"
                price="Rp50.000,00"
                badge="New"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/7625fe1d82448da4218259878661a01e73450b34?width=334"
                title="Consina Cooking Set"
                price="Rp100.000,00"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/2457b95d67406ec58af4f31440101718033d9f60?width=294"
                title="Eiger Carabiner Mug"
                price="Rp50.000,00"
                badge="Best Seller"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-12">
              <div className="border-t border-[#E8E6E6] mb-4"></div>
              <h2 className="text-[14px] tracking-[2.3px] text-brand-gray-text">LIGHTING & OTHER</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/4980178d9a3888ce8fd72ddaa9ba09fdb74d6306?width=332"
                title="Eiger Soluna Lantern"
                price="Rp50.000,00"
                badge="New"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/30635d64dfa74cbdd1cc15124b2e3e2ca69d4de0?width=264"
                title="Consina Light Lantern"
                price="Rp50.000,00"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/2237ef1ab81a2fac4f2acb8a8133198901a673c4?width=294"
                title="Consina Flood Headlamp"
                price="Rp150.000,00"
                badge="Best Seller"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/3b2aae45511ef3a0b5084059febc7257e5233953?width=204"
                title="Consina Camping Lamp YY17"
                price="Rp100.000,00"
                badge="Best Seller"
              />
              <LinkedProductCard 
                image="https://api.builder.io/api/v1/image/assets/TEMP/bad9c4e1c761e3c73c93eacf3e4268402379b67c?width=308"
                title="Consina Headlamp"
                price="Rp100.000,00"
              />
            </div>
            
            <div className="text-center">
              <Link to="/products" className="inline-block bg-black text-white px-8 py-3 text-[12px] tracking-[1.3px]">
                CLICK MORE
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-brand-gray-light py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-[14px] tracking-[2.25px] text-brand-gray-text font-bold">CUSTOMERS FEEDBACK</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4f493d4f4a20be34ec4b31fbfcd10535eeb19a49?width=250"
                  alt="Customer 1"
                  className="w-[125px] h-[126px] rounded-full mx-auto mb-4 object-cover"
                />
                <p className="font-bold text-[14px] text-gray-700 mb-3 font-['Poppins']">
                  prabsky Bieber.<br/>Hiking Master
                </p>
                <p className="text-[12px] text-gray-600 font-bold font-['Poppins'] leading-relaxed">
                  "Sangat Bagus, dan mendukung peforma sebagai Pendaki Gunung"
                </p>
              </div>

              <div className="text-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/9a2ff09c6f1e69421e58268a0758eb1df360cecd?width=247"
                  alt="Customer 2"
                  className="w-[123px] h-[115px] mx-auto mb-4 object-cover"
                />
                <p className="font-bold text-[14px] text-gray-700 mb-3 font-['Poppins']">
                  Shawn Mendes.<br/>Pendaki Gunung
                </p>
                <p className="text-[12px] text-gray-600 font-bold font-['Poppins'] leading-relaxed">
                  "Peralatannya lengkap dan terawat banget! Sebagai pendaki pemula, saya jadi lebih percaya diri karena semua kebutuhan mendaki sudah tersedia. Proses sewanya juga gampang dan cepat"
                </p>
              </div>

              <div className="text-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/83fe311f3711a14b5e3f6ca0f57630988f8e2d1e?width=247"
                  alt="Customer 3"
                  className="w-[123px] h-[115px] mx-auto mb-4 object-cover"
                />
                <p className="font-bold text-[14px] text-gray-700 mb-3 font-['Poppins']">
                  Charlie Puth.<br/>Pendaki Gunung
                </p>
                <p className="text-[12px] text-gray-600 font-bold font-['Poppins'] leading-relaxed">
                  "Kami rutin sewa alat di sini untuk kegiatan komunitas, dan selalu puas. Tenda, sleeping bag, sampai kompor hiking semuanya dalam kondisi prima. Adminnya juga responsif banget!"
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center grayscale opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/011f002f8a256e4e6f1534aa74e368047079f13a?width=498"
              alt="Eiger"
              className="w-[100px] md:w-[140px] h-auto"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/55b8f9be9f645c0477e3a394cd948ec98390c273?width=378"
              alt="Osprey"
              className="w-[100px] md:w-[140px] h-auto"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/4339786c9cfc23b5d0a7e7a05977b968791ad2b9?width=476"
              alt="The North Face"
              className="w-[120px] md:w-[180px] h-auto col-span-2 md:col-span-1"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/eea15092938ac274fd91a9fc7270c7e04315dbc2?width=286"
              alt="Jack Wolfskin"
              className="w-[90px] md:w-[120px] h-auto"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/78bd465a1dc4c6fc568ed96e210ea8ed39b2a726?width=280"
              alt="Consina"
              className="w-[90px] md:w-[120px] h-auto"
            />
          </div>
        </section>

        <section className="py-6 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
            <div className="relative">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/26c3f36bc49d2b0b9078770cfc61221cc711f9e8?width=602"
                alt="Gallery"
                className="w-full h-[201px] object-cover"
              />
            </div>
            <div className="relative">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/d76910592ed10a793a3e930337509eb4491e60cc?width=656"
                alt="Gallery"
                className="w-full h-[201px] object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 text-white p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 9H9.5L6.5 4H5.5C5.10218 4 4.72064 4.15804 4.43934 4.43934C4.15804 4.72064 4 5.10218 4 5.5V9ZM15.5 9H11L8 4H12.5L15.5 9ZM17 9L14 4H18.5C18.8978 4 19.2794 4.15804 19.5607 4.43934C19.842 4.72064 20 5.10218 20 5.5V9H17Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M20 10H4V18.5C4 18.8978 4.15804 19.2794 4.43934 19.5607C4.72064 19.842 5.10218 20 5.5 20H18.5C18.8978 20 19.2794 19.842 19.5607 19.5607C19.842 19.2794 20 18.8978 20 18.5V10ZM11 12.236V15.764C11 15.949 11.185 16.062 11.328 15.964L13.899 14.2C13.9304 14.177 13.956 14.1469 13.9736 14.1121C13.9912 14.0774 14.0004 14.039 14.0004 14C14.0004 13.961 13.9912 13.9226 13.9736 13.8879C13.956 13.8531 13.9304 13.823 13.899 13.8L11.328 12.036C11.185 11.938 11 12.051 11 12.236Z" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/99fd29bd7ab6cc55fb2ea9928b18a2453ef40ed2?width=528"
                alt="Gallery"
                className="w-full h-[201px] object-cover"
              />
            </div>
            <div className="relative">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/722e70ab97c18561210456bba08100a6070c351f?width=584"
                alt="Gallery"
                className="w-full h-[201px] object-cover"
              />
            </div>
            <div className="relative">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/77616720786804078945417c429f28fdb5609a15?width=270"
                alt="Gallery"
                className="w-full h-[201px] object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
