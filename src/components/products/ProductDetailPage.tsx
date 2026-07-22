import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Sparkles,
  MessageSquarePlus,
  ThumbsUp,
  Share2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    navigateTo,
    reviews,
    addReview,
    setCartDrawerOpen,
  } = useShop();

  // Find product or default to first
  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  // Selected state options
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'shipping'>('features');
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);

  // New review form
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');

  if (!product) return null;

  const inWish = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const currentVariant = product.variants ? product.variants[selectedVariantIdx] : undefined;
  const currentPrice = product.price + (currentVariant?.priceModifier || 0);

  const productReviews = reviews[product.id] || [];

  const handleWriteReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newComment) return;
    addReview(product.id, newRating, newTitle, newComment, newName || 'Verified Buyer');
    setWriteReviewOpen(false);
    setNewTitle('');
    setNewComment('');
  };

  const handleBuyNow = () => {
    addToCart(product, currentColor, currentVariant, quantity);
    setCartDrawerOpen(false);
    navigateTo('checkout');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="w-full bg-slate-50/50 font-sans min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('products', product.category)}
            className="hover:text-slate-900 cursor-pointer"
          >
            {product.categoryName}
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Main Showcase Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-100 via-indigo-50/20 to-slate-50 border border-slate-200/80 overflow-hidden shadow-inner">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-slate-900 shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                  inWish ? 'bg-rose-500 text-white shadow-md' : 'bg-white/90 text-slate-700 hover:text-rose-500 shadow-sm'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Carousel Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    selectedImageIdx === idx
                      ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Controls & Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                  {product.categoryName}
                </span>

                <div className="flex items-center gap-1 text-xs text-slate-700 font-bold">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{product.rating}</span>
                  <a href="#reviews-section" className="text-slate-400 hover:underline">
                    ({productReviews.length + product.reviewCount} reviews)
                  </a>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">{product.tagline}</p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-slate-900">{formatPrice(currentPrice)}</span>
                  {product.originalPrice && (
                    <span className="text-sm font-semibold text-slate-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tax included • Free shipping on orders over $75
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                In Stock ({product.stockCount} left)
              </span>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.description}</p>

            {/* Color Swatch Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>
                    Color: <strong className="text-indigo-600">{currentColor.name}</strong>
                  </span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`p-1 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColorIdx === idx
                          ? 'border-indigo-600 ring-2 ring-indigo-200 scale-110'
                          : 'border-slate-200 hover:scale-105'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-slate-300"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900">Edition / Specification</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-3 rounded-2xl text-xs font-bold text-left border transition-all cursor-pointer ${
                        selectedVariantIdx === idx
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>{v.name}</div>
                      {v.priceModifier ? (
                        <div className="text-[10px] text-indigo-400 font-semibold mt-0.5">
                          +{formatPrice(v.priceModifier)}
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-400 mt-0.5">Base Spec</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Controller */}
                <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-3 py-3 bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-extrabold text-slate-900 w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart CTA */}
                <button
                  id="add-to-cart-detail-btn"
                  onClick={() => addToCart(product, currentColor, currentVariant, quantity)}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-sm tracking-wide shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart • {formatPrice(currentPrice * quantity)}
                </button>
              </div>

              {/* Buy Now Direct Checkout Button */}
              <button
                id="buy-now-btn"
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Guarantee Pills */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold">
                <Truck className="w-4 h-4 text-indigo-600" /> Free 2-Day Ship
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <RefreshCw className="w-4 h-4 text-indigo-600" /> 30-Day Trial
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> Lifetime Warranty
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Technical Accordion Section */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex border-b border-slate-200 gap-6">
            {[
              { id: 'features', label: 'Key Features' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'shipping', label: 'Shipping & Warranty' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors relative cursor-pointer ${
                  activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 'features' && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="p-3.5 rounded-2xl bg-slate-50 flex justify-between">
                    <span className="font-bold text-slate-500">{key}</span>
                    <span className="font-extrabold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Express Dispatch:</strong> Orders placed before 2:00 PM EST ship same-day from California or Rotterdam. Tracking numbers are sent automatically via email.
                </p>
                <p>
                  <strong>30-Day Risk Free Trial:</strong> Test AURA products in your home for 30 days. If you aren't completely delighted, send it back for a 100% refund using our prepaid return labels.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="reviews-section" className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Verified Buyer Reviews</h2>
              <p className="text-xs text-slate-500 mt-1">Real ratings from real studio owners</p>
            </div>

            <button
              onClick={() => setWriteReviewOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" /> Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {productReviews.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No customer reviews yet. Be the first to leave one!</p>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="p-6 rounded-2xl bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                        <span className="text-[10px] text-emerald-600 font-semibold">Verified Buyer</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <h5 className="text-sm font-bold text-slate-900">{rev.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900">You Might Also Appreciate</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {writeReviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setWriteReviewOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 z-10"
            >
              <h3 className="text-xl font-black text-slate-900">Write a Review for {product.name}</h3>

              <form onSubmit={handleWriteReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`p-2 rounded-xl text-amber-400 border cursor-pointer ${
                          newRating >= star ? 'bg-amber-50 border-amber-300' : 'border-slate-200'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${newRating >= star ? 'fill-amber-400' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Exceptional acoustics and matte finish"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Detailed Review</label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                    placeholder="Describe build quality, audio performance, or comfort..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWriteReviewOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
