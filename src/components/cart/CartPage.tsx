import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Gift,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    navigateTo,
    products,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [giftNoteOpen, setGiftNoteOpen] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const crossSells = products.slice(0, 3);

  return (
    <div className="w-full bg-slate-50/50 font-sans min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Shopping Bag</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Review your selected studio objects</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your bag is currently empty</h2>
            <p className="text-xs text-slate-500">
              Explore our minimal luxury collection and discover precision tools for everyday life.
            </p>
            <button
              onClick={() => navigateTo('products')}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cart Line Items */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="divide-y divide-slate-100">
                {cart.map((item) => {
                  const itemUnitPrice =
                    item.product.price + (item.selectedVariant?.priceModifier || 0);

                  return (
                    <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-24 h-24 rounded-2xl object-cover bg-slate-100 border border-slate-100 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                          {item.product.categoryName}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">{item.product.name}</h3>
                        <p className="text-xs text-slate-500">
                          Color: <strong>{item.selectedColor.name}</strong>{' '}
                          {item.selectedVariant && `• ${item.selectedVariant.name}`}
                        </p>

                        <div className="pt-2 flex items-center gap-4">
                          <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-2.5 py-1 bg-slate-50">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="text-slate-500 hover:text-slate-900 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-slate-900 w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="text-slate-500 hover:text-slate-900 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-lg font-black text-slate-900">
                          {formatPrice(itemUnitPrice * item.quantity)}
                        </span>
                        <div className="text-[11px] text-slate-400">
                          {formatPrice(itemUnitPrice)} each
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Gift Note Accordion */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setGiftNoteOpen(!giftNoteOpen)}
                  className="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-indigo-600" />
                  Add complimentary gift packaging note
                </button>
                {giftNoteOpen && (
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    rows={3}
                    placeholder="Write a personal gift message to be printed on matte cardstock..."
                    className="mt-2 w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs outline-none focus:border-indigo-500"
                  />
                )}
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-slate-900">Order Summary</h2>

              {/* Promo Code Form */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Code <strong>{appliedPromo.code}</strong>
                    </span>
                    <button onClick={removePromoCode} className="text-indigo-500 hover:text-rose-600 font-bold">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. AURA10)"
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs outline-none focus:border-indigo-500 uppercase font-semibold text-slate-800"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-indigo-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {cartShippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPrice(cartShippingFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartTax)}</span>
                </div>

                <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-black text-slate-900">
                  <span>Total</span>
                  <span className="text-indigo-600">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-page-checkout-btn"
                onClick={() => navigateTo('checkout')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-sm tracking-wide shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout • {formatPrice(cartTotal)}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Cross-Sells Section */}
        {cart.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h2 className="text-xl font-black text-slate-900">Frequently Added Together</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {crossSells.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
