import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import { MOCK_USER } from '../../data/mockData';
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  User,
  Award,
  Truck,
  ExternalLink,
  ShoppingBag,
  Trash2,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, toggleWishlist, addToCart, formatPrice, navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'payments'>('orders');

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Banner Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={MOCK_USER.avatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                Studio Collector
              </span>
              <h1 className="text-2xl font-black text-slate-900">{MOCK_USER.name}</h1>
              <p className="text-xs text-slate-500">{MOCK_USER.email} • Member since {MOCK_USER.memberSince}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-indigo-50/80 rounded-2xl border border-indigo-100 text-indigo-900">
            <Award className="w-6 h-6 text-indigo-600" />
            <div>
              <p className="text-xs font-bold">{MOCK_USER.rewardsPoints} AURA Rewards Points</p>
              <p className="text-[10px] text-indigo-600 font-medium">Unlocked $20 Reward Coupon</p>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 gap-4 overflow-x-auto">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
            { id: 'payments', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <p className="text-xs text-slate-500">No order history found.</p>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{ord.id}</span>
                      <span className="text-slate-400 ml-2">• Placed on {ord.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                        {ord.status}
                      </span>
                      <span className="font-extrabold text-slate-900">{formatPrice(ord.total)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={it.productImage} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100" referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-bold text-slate-900">{it.productName}</p>
                            <p className="text-[10px] text-slate-500">Color: {it.colorName} • Qty: {it.quantity}</p>
                          </div>
                        </div>
                        <span className="font-extrabold text-slate-900">{formatPrice(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Carrier Tracking: <strong>{ord.trackingNumber}</strong></span>
                    <button className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                      Track Parcel <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-slate-200/80 shadow-sm space-y-3">
                <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Your wishlist is currently empty</h3>
                <p className="text-xs text-slate-500">Save products while browsing to review them later.</p>
                <button onClick={() => navigateTo('products')} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer">
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm max-w-md space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Default Shipping Address</h3>
            <p className="text-slate-600 font-medium">
              Elena Rostova<br />
              742 Montgomery St, Suite 800<br />
              San Francisco, CA 94111, United States<br />
              Phone: +1 (555) 382-9102
            </p>
          </div>
        )}

        {/* Tab 4: Payments */}
        {activeTab === 'payments' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm max-w-md space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Default Payment Method</h3>
            <p className="text-slate-600 font-medium">
              Apple Pay (Linked to Visa •••• 4921)<br />
              Billing Zip: 94111
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
