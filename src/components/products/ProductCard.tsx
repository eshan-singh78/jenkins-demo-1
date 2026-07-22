import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'square' | 'portrait';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, aspectRatio = 'square' }) => {
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop();

  const [hovered, setHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const inWish = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIdx] || product.colors[0];

  // Image source based on hover or color selection
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;
  const activeImage = hovered && product.images.length > 1 ? secondaryImage : primaryImage;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-xl border border-neutral-200/90 p-3 shadow-sm hover:shadow-xl hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Display Area with Light Gradient Background */}
        <div
          onClick={() => openProductDetail(product.id)}
          className={`relative w-full ${
            aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
          } rounded-lg bg-gradient-to-br from-[#F5F7FA] to-[#E4E8F0] overflow-hidden cursor-pointer`}
        >
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Badge Overlay */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span
                className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-sm ${
                  product.badge === 'Bestseller'
                    ? 'brand-gradient'
                    : product.badge === 'New'
                    ? 'bg-neutral-900'
                    : product.badge === 'Sale'
                    ? 'bg-rose-600'
                    : 'bg-amber-600'
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist Heart Button */}
          <button
            id={`wishlist-toggle-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
              inWish
                ? 'bg-rose-500 text-white shadow-md scale-110'
                : 'bg-white/80 hover:bg-white text-neutral-800 hover:text-rose-500 shadow-sm'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Add / Quick View Hover Overlay Button */}
          <div className="absolute inset-x-2.5 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, currentColor);
              }}
              className="flex-1 py-2 px-3 rounded brand-gradient hover:brand-gradient-hover text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              Add To Bag
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openProductDetail(product.id);
              }}
              className="p-2 rounded bg-white hover:bg-neutral-100 text-neutral-900 text-[10px] font-bold transition-all shadow-md flex items-center justify-center cursor-pointer"
              title="View Details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-3 px-1 space-y-1">
          {/* Category & Color Swatches Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
              {product.categoryName}
            </span>

            {/* Color Swatch Dots */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColorIdx(idx);
                    }}
                    title={c.name}
                    className={`w-3 h-3 rounded-full border transition-all cursor-pointer ${
                      selectedColorIdx === idx
                        ? 'border-neutral-900 scale-125 ring-2 ring-neutral-200'
                        : 'border-neutral-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => openProductDetail(product.id)}
            className="text-xs font-black uppercase tracking-[0.04em] text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-[11px] text-neutral-500 line-clamp-1 leading-snug">{product.tagline}</p>
        </div>
      </div>

      {/* Footer Price & Rating Row */}
      <div className="mt-2.5 px-1 pt-2 border-t border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-neutral-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[10px] font-semibold text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-neutral-600 font-bold">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>{product.rating}</span>
        </div>
      </div>
    </motion.div>
  );
};
