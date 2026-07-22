import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { FAQ_ITEMS } from '../../data/mockData';
import {
  Sparkles,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Search,
  CheckCircle2,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            AURA Studio Manifesto
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Design Without Noise
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Founded in 2024 by an international collective of industrial designers, acousticians, and material engineers in San Francisco and Rotterdam.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900">1. Monolithic Purity</h2>
            <p>
              We believe consumer electronics and everyday carry have become cluttered with cheap plastics, fake chrome, and planned obsolescence. Every AURA object is sculpted from single billets of anodized aluminum, Tuscan vegetable-tanned leather, or borosilicate glass.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900">2. Uncompromised Acoustics</h2>
            <p>
              Our audio engineering team spent 18 months tuning beryllium foils and active noise cancellation algorithms to achieve a neutral studio soundstage where low-end warmth meets pristine high-frequency clarity.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900">3. Carbon Negative Goal</h2>
            <p>
              100% of our supply chain emissions are audited and offset. We package all goods in plastic-free recycled paper pulp with vegetable inks.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-center">
            <button
              onClick={() => navigateTo('products')}
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Explore Studio Objects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Enquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message sent to AURA Studio Concierge', 'success');
  };

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Dedicated Support & Press
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Contact Studio Concierge</h1>
          <p className="text-sm text-slate-500">Typical response time is under 2 hours during studio hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-black text-white">Studio Hubs</h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">San Francisco HQ</strong>
                  742 Montgomery St, Suite 800, San Francisco, CA 94111
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Rotterdam Studio</strong>
                  Witte de Withstraat 44, 3012 BR Rotterdam, Netherlands
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Direct Email</strong>
                  concierge@aura-goods.com
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Delivered</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  A member of our concierge team will respond to {form.email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Elena Rostova"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="elena@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="General Enquiry">General Product Enquiry</option>
                    <option value="Order Tracking">Order & Shipping Status</option>
                    <option value="Returns & Warranty">30-Day Return or Warranty</option>
                    <option value="Press & Business">Press & Corporate Gifting</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="How can we assist your studio today?"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Help Center
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm text-slate-500">Everything you need to know about shipping, trial policy, and care.</p>
        </div>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. shipping, warranty, returns)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm divide-y divide-slate-100">
          {filteredFaqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openIdx === idx ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LegalPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 text-xs text-slate-600 leading-relaxed">
        <h1 className="text-3xl font-black text-slate-900">{title}</h1>
        <p>
          Last updated: July 2026. AURA Modern Goods Inc. respects your privacy and is committed to protecting your personal data in accordance with GDPR and CCPA standards.
        </p>
        <p>
          We do not sell your personal information. Payment processing is secured via PCI-DSS Level 1 encrypted payment gateways.
        </p>
      </div>
    </div>
  );
};
