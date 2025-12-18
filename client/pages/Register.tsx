import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBanner from "@/components/NoticeBanner";

export default function Register() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <NoticeBanner showSearch={false} />

      {/* Hero banner */}
      <section
        className="relative h-[200px] md:h-[300px] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1920&auto=format&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl tracking-wide">Prosedur Sewa</h1>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 lg:px-8 py-10">
        <section className="space-y-2 text-sm text-gray-800 leading-7">
          <h2 className="font-semibold">Ketentuan :</h2>
          <p>Sebelum register, customer diwajibkan membaca dan menyetujui syarat & ketentuan</p>
          <p>Data yang dimasukkan dijamin keamanannya</p>
          <p>Data yang dimasukkan bersifat perorangan, bukan perusahaan</p>
          <p>Pastikan data valid dan lengkap, serta telepon yang didaftarkan dalam keadaan aktif</p>
        </section>

        <section className="space-y-2 text-sm text-gray-800 leading-7 mt-8">
          <h2 className="font-semibold">Tentukan pilihan Prosedur:</h2>
          <p>
            <span className="font-medium">Member (Free):</span> setiap sewa tanpa jaminan, melalui proses verifikasi data minimal 1 hari kerja, bisa lebih cepat/lama tergantung kelengkapan data dan kebijakan internal tim verifikasi (Info: 98% penyewa adalah member)
          </p>
          <p>
            <span className="font-medium">Non-Member:</span> order langsung tanpa proses verifikasi data, setiap sewa menggunakan deposit (senilai alat yang disewa), jasa pengawal alat atau layanan ekspres (berlaku untuk alat tertentu)
          </p>
          <p className="text-gray-600 text-[13px]">*Hasil register Member bisa disetujui atau tidak disetujui (otomatis menjadi Non-Member) merupakan kebijakan internal yang bersifat rahasia dan tidak dapat diganggu gugat, meneruskan proses register artinya telah menyetujui kondisi tersebut.</p>
        </section>

        <div className="flex items-center gap-4 mt-10">
          <button className="bg-black text-white px-6 py-3 text-[12px] tracking-[1px]">MEMBER</button>
          <button className="bg-gray-300 text-gray-600 px-6 py-3 text-[12px] tracking-[1px]" disabled>NON-MEMBER</button>
        </div>

        <div className="mt-8 text-center text-xl">★</div>
      </main>

      <Footer />
    </div>
  );
}
