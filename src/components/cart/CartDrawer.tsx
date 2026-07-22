import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    freeShippingThreshold,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    navigateTo,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

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

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              id="cart-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/40 via-purple-50/20 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 text-white">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Your Cart</h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                <button
                  id="cart-drawer-close"
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-indigo-600" />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">🎉 You unlocked Free Express Shipping!</span>
                    ) : (
                      <span>
                        Add <strong className="text-slate-900">{formatPrice(amountNeededForFreeShipping)}</strong> more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{Math.round(freeShippingPercent)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Your cart is empty</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        Explore our minimal luxury collection and find tools crafted for life.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCartDrawerOpen(false);
                        navigateTo('products');
                      }}
                      className="mt-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                    >
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const itemUnitPrice =
                      item.product.price + (item.selectedVariant?.priceModifier || 0);

                    return (
                      <div key={item.id} className="py-4 flex gap-4 items-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-2xl object-cover bg-slate-100 border border-slate-100 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-slate-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span>{item.selectedColor.name}</span>
                            {item.selectedVariant && (
                              <span className="text-slate-400">• {item.selectedVariant.name}</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-2 py-1 bg-slate-50">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="text-slate-500 hover:text-slate-900 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-slate-900 w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="text-slate-500 hover:text-slate-900 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Item Price */}
                            <span className="text-sm font-extrabold text-slate-900">
                              {formatPrice(itemUnitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Remove trash button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer with Price Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-white space-y-4 shadow-lg">
                  {/* Promo Code Form */}
                  <div>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-700 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" /> Code <strong>{appliedPromo.code}</strong> ({appliedPromo.label})
                        </span>
                        <button
                          onClick={removePromoCode}
                          className="text-indigo-400 hover:text-rose-600 font-bold cursor-pointer"
                        >
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
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}
                  </div>

                  {/* Calculations breakdown */}
                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
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
                      <span>Shipping</span>
                      <span className="font-semibold text-slate-900">
                        {cartShippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPrice(cartShippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-black text-slate-900">
                      <span>Total</span>
                      <span className="text-base text-indigo-600">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Primary Checkout CTA Button */}
                  <div className="space-y-2 pt-2">
                    <button
                      id="cart-drawer-checkout-btn"
                      onClick={() => {
                        setCartDrawerOpen(false);
                        navigateTo('checkout');
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-indigo-600 hover:to-purple-600 text-white font-black text-sm tracking-wide shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      Checkout Now • {formatPrice(cartTotal)}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setCartDrawerOpen(false);
                        navigateTo('cart');
                      }}
                      className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      View Detailed Cart Page
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
