export default function Footer() {
  return (
    <footer className="bg-brand-gray-light border-t-[5px] border-brand-gray-light">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <h3 className="font-bold text-[14px] mb-6">ABOUT US</h3>
            <div className="space-y-3 text-brand-gray-text text-[14px] leading-relaxed">
              <p>Rental peralatan camping dan hiking</p>
              <p>Multimedia dll. Tersedia di Jawa Timur</p>
              <p>Surabaya sejak tahun 2025. Buka 24 Jam.</p>
              <p className="mt-6">Feel free to contact us what you need for your</p>
              <p>best equipment production.</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-[14px] mb-6">SOCIAL MEDIA</h3>
            <div className="flex gap-2">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/869dd9cc9d2b21aee30666996ea2279e680f8a57?width=84" 
                alt="Instagram" 
                className="w-[42px] h-[42px]"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/0067e555a8278eb805edd5474ce0f964b414eb06?width=84" 
                alt="Facebook" 
                className="w-[42px] h-[42px]"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/f7d5a1b0eff146606d13b45e84b1631abddb7c7e?width=84" 
                alt="TikTok" 
                className="w-[42px] h-[42px]"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-[14px] mb-6">CONTACT US</h3>
            <div className="space-y-3 text-brand-gray-text text-[14px]">
              <p className="font-bold text-[13px]">Whatsapp 08989-555-230 (24 Hours)</p>
              <p>Himajo@gmail.com</p>
              <p>Surabaya dan Sekitarnya</p>
              <p>Kritik & Saran0812-9013-3213 (WA)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t bg-white py-4">
        <p className="text-center text-[#A6A6A6] text-[14px]">© 2025 by Himajo</p>
      </div>
    </footer>
  );
}
