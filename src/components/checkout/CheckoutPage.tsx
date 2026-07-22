import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useShop } from '../../context/ShopContext';
import { ShippingAddress, Order } from '../../types';
import {
  Lock,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  Printer,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTax,
    cartTotal,
    formatPrice,
    placeOrder,
    navigateTo,
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping, 2: Payment & Review, 3: Order Confirmation
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [shippingForm, setShippingForm] = useState<ShippingAddress>({
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@aura-goods.com',
    phone: '+1 (555) 382-9102',
    address: '742 Montgomery St, Suite 800',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94111',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'googlepay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(shippingForm, paymentMethod === 'card' ? 'Credit Card (•••• 4242)' : paymentMethod === 'applepay' ? 'Apple Pay' : 'Google Pay');
    setCompletedOrder(order);
    setStep(3);

    // Launch celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#818CF8', '#C084FC', '#38BDF8', '#34D399'],
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order complete (Step 3)
  if (step === 3 && completedOrder) {
    return (
      <div className="w-full bg-slate-50 font-sans min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Payment Confirmed & Order Placed
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Thank you for your order, {completedOrder.shippingAddress.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Order confirmation and receipt sent to <strong>{completedOrder.shippingAddress.email}</strong>
              </p>
            </div>

            {/* Order Details Badge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between text-xs font-semibold gap-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Order Reference</span>
                <span className="text-slate-900 font-black text-sm">{completedOrder.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Estimated Delivery</span>
                <span className="text-indigo-600 font-extrabold">{completedOrder.estimatedDelivery}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Total Charged</span>
                <span className="text-slate-900 font-extrabold">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            {/* Line items summary */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-left">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Purchased Objects</h4>
              <div className="divide-y divide-slate-100">
                {completedOrder.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.productImage} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-slate-900">{item.productName}</p>
                        <p className="text-[10px] text-slate-500">Color: {item.colorName} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-black text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Invoice
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="flex-1 py-3.5 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Steps Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span className="text-xl font-black text-slate-900">AURA Express Checkout</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              1. Shipping
            </span>
            <span>→</span>
            <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              2. Payment & Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            {step === 1 ? (
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <h2 className="text-lg font-black text-slate-900">1. Shipping Address</h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">First Name</label>
                    <input
                      type="text"
                      value={shippingForm.firstName}
                      onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
                    <input
                      type="text"
                      value={shippingForm.lastName}
                      onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                    <input
                      type="text"
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={shippingForm.zipCode}
                      onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-sm transition-colors cursor-pointer"
                >
                  Continue to Payment →
                </button>
              </form>
            ) : (
              <form onSubmit={handleCompletePayment} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900">2. Select Payment Method</h2>
                  <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-indigo-600 underline">
                    Edit Address
                  </button>
                </div>

                {/* Express Payment Options */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'card' ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'applepay' ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('googlepay')}
                    className={`py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'googlepay' ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    Google Pay
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm tracking-wide shadow-xl transition-all cursor-pointer"
                >
                  Authorize Payment • {formatPrice(cartTotal)}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 h-fit">
            <h3 className="text-base font-black text-slate-900">Order Summary ({cart.length} items)</h3>

            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-slate-900 truncate max-w-[160px]">{item.product.name}</p>
                      <p className="text-[10px] text-slate-500">Qty: {item.quantity} • {item.selectedColor.name}</p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-indigo-600 font-bold">
                  <span>Discount</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-slate-900">{cartShippingFee === 0 ? 'FREE' : formatPrice(cartShippingFee)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-black text-slate-900">
                <span>Total</span>
                <span className="text-indigo-600">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
