import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panduan Penggunaan</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cara Memesan</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Pilih produk yang ingin Anda sewa</li>
          <li>Klik tombol "Sewa Sekarang" pada produk</li>
          <li>Tentukan durasi sewa dan jumlah barang</li>
          <li>Lengkapi data pemesanan</li>
          <li>Lakukan pembayaran</li>
          <li>Tunggu konfirmasi dari admin</li>
        </ol>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Panduan Pencarian</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Filter Harga</h3>
            <p className="text-gray-600">Gunakan slider atau masukkan nominal untuk memfilter produk berdasarkan rentang harga.</p>
          </div>
          <div>
            <h3 className="font-medium">Kategori</h3>
            <p className="text-gray-600">Pilih kategori produk untuk mempersempit hasil pencarian.</p>
          </div>
          <div>
            <h3 className="font-medium">Urutkan</h3>
            <p className="text-gray-600">Urutkan produk berdasarkan: Harga Terendah, Harga Tertinggi, atau Terbaru.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium">Berapa lama waktu pemrosesan pesanan?</h3>
            <p className="text-gray-600">Pesanan diproses dalam 1x24 jam pada hari kerja.</p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-medium">Bagaimana jika produk rusak saat disewa?</h3>
            <p className="text-gray-600">Segera laporkan kerusakan kepada kami. Biaya perbaikan akan ditanggung sesuai kebijakan yang berlaku.</p>
          </div>
          <div>
            <h3 className="font-medium">Apakah ada biaya tambahan untuk pengiriman?</h3>
            <p className="text-gray-600">Biaya pengiriman dihitung berdasarkan jarak dan akan ditampilkan saat checkout.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Butuh Bantuan Lebih Lanjut?</h2>
        <p className="mb-4">Tim dukungan kami siap membantu Anda.</p>
        <div className="space-y-2">
          <p>📧 cs@himajo-outdoor.com</p>
          <p>📞 (021) 1234-5678</p>
          <p>🕒 Senin-Minggu, 09.00-21.00 WIB</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
