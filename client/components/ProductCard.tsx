interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  badge?: "New" | "Best Seller";
}

export default function ProductCard({ image, title, price, badge }: ProductCardProps) {
  return (
    <div className="h-full w-full flex flex-col border border-[#E8E6E6] bg-white hover:shadow-lg transition-shadow group cursor-pointer">
      <div className="relative w-full h-[174px] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {badge && (
          <div className="absolute top-0 left-0 bg-brand-badge text-white px-3 py-1 text-[13px]">
            {badge}
          </div>
        )}
      </div>
      <div className="p-4 mt-auto">
        <h3 className="text-[15px] font-normal mb-2 min-h-[36px] line-clamp-2">{title}</h3>
        <p className="text-brand-gray-text text-[13px]">{price}</p>
      </div>
    </div>
  );
}
