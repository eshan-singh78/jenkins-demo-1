import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast, navigateTo, setCartDrawerOpen } = useShop();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          id="toast-notification"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-md bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xl rounded-2xl p-4 flex items-center gap-3"
        >
          {toast.image ? (
            <img
              src={toast.image}
              alt=""
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800 flex-shrink-0">
              {toast.type === 'info' ? (
                <Info className="w-5 h-5 text-indigo-600" />
              ) : toast.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0 pr-2">
            <p className="text-sm font-medium text-slate-900 leading-snug truncate">
              {toast.message}
            </p>
            {toast.message.includes('cart') && (
              <button
                id="toast-view-cart-btn"
                onClick={() => {
                  setCartDrawerOpen(true);
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline mt-0.5 cursor-pointer"
              >
                View Cart & Checkout →
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
