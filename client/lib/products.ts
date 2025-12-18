export type Product = {
  slug: string;
  name: string;
  price: string;
  image: string;
  isBestSeller?: boolean;
};

export const products: Product[] = [
  { slug: "consina-bering-60", name: "Consina Bering 60", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/a72eaa1efdd58746e27f3cbbb29ff111dc6423ab?width=394" },
  { slug: "osprey-atmos-60", name: "Osprey Atmos 60", price: "Rp350.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/4faa88f9ccf8be540c8a111d23a77d7d8bfd0631?width=356" },
  { slug: "eiger-phalanger-35", name: "Eiger phalanger 35", price: "Rp350.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/89334124bc0e159068472945f6e7df5b71249868?width=272" },
  { slug: "jack-wolfskin-jacket", name: "Jack Wolfskin Jacket", price: "Rp150.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/8c266c0d69634880ea1849eebad7fbb3e7bc3238?width=426", isBestSeller: true },
  { slug: "eiger-equator-tent", name: "Eiger Equator Tent", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/d29d7817ce78b3515bb7e11e14e5e4d13a232203?width=444" },
  { slug: "big-adventure-tambora-series", name: "Big Adventure Tambora Series", price: "Rp350.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/f7f969f5ca658a573bc548986e62bd6e015aa2ff?width=478", isBestSeller: true },
  { slug: "salomon-xt-6-gtx-triple-black", name: "Salomon XT-6 Gore-Tex Triple Black", price: "Rp400.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/7e93c4a8b355a191de95a9080237a6f1053673cf?width=622" },
  { slug: "eiger-mamba-low", name: "Eiger Mamba Low", price: "Rp155.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/33cea92eca40cff152ae6bd5cc4ab93bf1cb97d6?width=472" },
  { slug: "eiger-valor-trekking-pole", name: "Eiger Valor Trekking Pole", price: "Rp100.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/db9655e3e495e42b3e08f040d3babab8fe5e1d13?width=440" },
  { slug: "consina-mountain-pro", name: "Consina Mountain Pro", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/3de165966ea435336595c235aee7943b817123d3?width=402" },
  { slug: "the-north-face-mountain-jacket", name: "The North Face Mountain Jacket", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/b3fa994bc541652c1698bc7202a5d0e0410c1b2e?width=528" },
  { slug: "consina-snta-496", name: "Consina Snta 496", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/cd4e01f09cf67a2596bf5b2fca3d5e497f7d507d?width=438" },
  { slug: "eiger-tigerclaw-2-5", name: "Eiger Tigerclaw 2.5", price: "Rp350.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/bab427ab2351f9fd02ffb45ab90a8639888efd43?width=422" },
  { slug: "eiger-stroll-section-3", name: "Eiger Stroll Section 3", price: "Rp100.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/249edd1546a1751d61a619611b3c4f39dc0b13a3?width=326" },
  { slug: "kursi-lipat-large", name: "Kursi Lipat (Large)", price: "Rp30.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/6300f784e63f2d01d4c0b24db0647c01faee183d?width=308" },
  { slug: "consina-magnum-4", name: "Consina Magnum 4", price: "Rp150.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/b59584729a60b8488cd313df0338edf37d998785?width=412" },
  { slug: "consina-karibu-5", name: "Consina Karibu 5", price: "Rp200.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/c300acd24e808e4328e62bb2ecb73d0362427252?width=436" },
  { slug: "consina-cooking-set", name: "Consina Cooking Set", price: "Rp100.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/2722a536f81e87e46ca8960056bec12da8d858ec?width=432" },
  { slug: "osprey-stratos-50", name: "Osprey Stratos 50", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/080cedd1057a1cc37c590cbc133a3bc3b3015c5b?width=372" },
  { slug: "the-north-face-terra-50", name: "The North Face Terra 50", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/f6056d98b2cf1e7183d96c5142228465624f397b?width=420" },
  { slug: "the-north-face-strombreak-2p", name: "The North Face Strombreak 2P", price: "Rp350.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/7f5f4f611fd52016a13db938ae49c709bd047b02?width=438" },
  { slug: "the-north-face-puffer-jacket", name: "The North Face Puffer Jacket", price: "Rp200.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/d93aaa0865ad8f003bc655b033e137c4c8fd8d38?width=346" },
  { slug: "the-north-face-antora-jacket", name: "The North Face Antora Jacket", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/b3c0da2e68da368affe5aeb8862b3c77cc55a275?width=372" },
  { slug: "consina-kettle", name: "Consina Kettle", price: "Rp50.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/ed6bc42c7fcf0418ecfcba0296d9e0438a3b0d52?width=340" },
  { slug: "jack-wolfskin-chiliy-morning", name: "Jack Wolfskin Chiliy Morning", price: "Rp250.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/50a0c1f9a348b344f89e0efe5c5a6490ec158d87?width=422" },
  { slug: "jack-wolfskin-texapore-shoes", name: "Jack Wolfskin Texapore shoes", price: "Rp200.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/046b364c998ce99314c3dd1da444ad1fa79cb0fb?width=438" },
  { slug: "eiger-inferno-stove", name: "Eiger Inferno Stove", price: "Rp200.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/79daa63bec70d307867e7aa15b3512d6fbb17c65?width=398" },
  { slug: "eiger-across-1-0-windproof", name: "Eiger Across 1.0 windproof", price: "Rp150.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/135f7a4378a3982f57a0690462ef5f694607aa30?width=312" },
  { slug: "eiger-finder-insulation-jacket", name: "Eiger Finder Insulation Jacket", price: "Rp150.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/60fef89cd903eebbd3589716da917aaf332c8651?width=318" },
  { slug: "eiger-campfire-stove", name: "Eiger Campfire Stove", price: "Rp50.000,00", image: "https://api.builder.io/api/v1/image/assets/TEMP/fcb1f8d1152a3e5c39da799bd14ea2ed399ea100?width=240" },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
