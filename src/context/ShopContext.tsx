import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  ColorOption,
  VariantOption,
  Order,
  ShippingAddress,
  Currency,
  CurrencyCode,
  PageView,
  CategoryId,
  Review,
} from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { MOCK_ORDERS, VALID_PROMO_CODES, SAMPLE_REVIEWS } from '../data/mockData';

const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
  JPY: { code: 'JPY', symbol: '¥', rate: 155 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36 },
};

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  activePage: PageView;
  selectedProductId: string | null;
  selectedCategory: CategoryId;
  currency: Currency;
  cartDrawerOpen: boolean;
  searchModalOpen: boolean;
  toast: { message: string; type?: 'info' | 'success' | 'warning'; image?: string } | null;
  orders: Order[];
  appliedPromo: { code: string; label: string; discountPercent?: number; discountFixed?: number } | null;
  recentlyViewed: Product[];
  reviews: Record<string, Review[]>;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTax: number;
  cartTotal: number;
  freeShippingThreshold: number;
  
  // Handlers
  setCartDrawerOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  addToCart: (product: Product, color?: ColorOption, variant?: VariantOption, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  openProductDetail: (productId: string) => void;
  navigateTo: (page: PageView, category?: CategoryId) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (priceUSD: number) => string;
  showToast: (message: string, type?: 'info' | 'success' | 'warning', image?: string) => void;
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: string) => Order;
  addReview: (productId: string, rating: number, title: string, comment: string, userName: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products list
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Page routing
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // Currency
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>('USD');
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  // UI Drawers & Modals
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'warning'; image?: string } | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('aura_orders');
      return saved ? JSON.parse(saved) : MOCK_ORDERS;
    } catch {
      return MOCK_ORDERS;
    }
  });

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    label: string;
    discountPercent?: number;
    discountFixed?: number;
  } | null>(null);

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Reviews map
  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const initialMap: Record<string, Review[]> = {};
    SAMPLE_REVIEWS.forEach((rev) => {
      if (!initialMap[rev.productId]) initialMap[rev.productId] = [];
      initialMap[rev.productId].push(rev);
    });
    return initialMap;
  });

  // Save cart to localstorage
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localstorage
  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save orders
  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProductId]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'success', image?: string) => {
    setToast({ message, type, image });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const navigateTo = (page: PageView, category: CategoryId = 'all') => {
    setActivePage(page);
    setSelectedCategory(category);
    if (page !== 'product-detail') {
      setSelectedProductId(null);
    }
  };

  const openProductDetail = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProductId(productId);
      setActivePage('product-detail');
      // Add to recently viewed
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((p) => p.id !== productId);
        return [prod, ...filtered].slice(0, 6);
      });
    }
  };

  const addToCart = (
    product: Product,
    color?: ColorOption,
    variant?: VariantOption,
    quantity: number = 1
  ) => {
    const chosenColor = color || product.colors[0];
    const cartItemId = `${product.id}-${chosenColor?.name}-${variant?.id || 'std'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedColor: chosenColor,
          selectedVariant: variant,
          quantity,
        },
      ];
    });

    showToast(`Added ${product.name} to cart`, 'success', product.images[0]);
    setCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`, 'success', product.images[0]);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const promo = VALID_PROMO_CODES[cleanCode];
    if (promo) {
      setAppliedPromo({
        code: cleanCode,
        label: promo.label,
        discountPercent: promo.discountPercent,
        discountFixed: promo.discountFixed,
      });
      showToast(`Promo code ${cleanCode} applied!`, 'success');
      return { success: true, message: `Promo code ${cleanCode} applied!` };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const setCurrencyCode = (code: CurrencyCode) => {
    setCurrencyCodeState(code);
  };

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * currency.rate;
    if (currency.code === 'JPY') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      cartDiscount = (cartSubtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountFixed) {
      cartDiscount = Math.min(appliedPromo.discountFixed, cartSubtotal);
    }
  }

  const freeShippingThreshold = 75;
  const cartShippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 12;
  const cartTax = (cartSubtotal - cartDiscount) * 0.08;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee + cartTax);

  const placeOrder = (shippingAddress: ShippingAddress, paymentMethod: string): Order => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: cartShippingFee,
      tax: cartTax,
      total: cartTotal,
      items: cart.map((item) => ({
        id: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        colorName: item.selectedColor.name,
        variantName: item.selectedVariant?.name,
        price: item.product.price + (item.selectedVariant?.priceModifier || 0),
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
      trackingNumber: `1Z${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const addReview = (productId: string, rating: number, title: string, comment: string, userName: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName: userName || 'Verified Buyer',
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title,
      comment,
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setReviews((prev) => {
      const existing = prev[productId] || [];
      return { ...prev, [productId]: [newRev, ...existing] };
    });

    showToast('Thank you! Your review has been published.', 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        activePage,
        selectedProductId,
        selectedCategory,
        currency,
        cartDrawerOpen,
        searchModalOpen,
        toast,
        orders,
        appliedPromo,
        recentlyViewed,
        reviews,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTax,
        cartTotal,
        freeShippingThreshold,

        setCartDrawerOpen,
        setSearchModalOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        openProductDetail,
        navigateTo,
        applyPromoCode,
        removePromoCode,
        setCurrencyCode,
        formatPrice,
        showToast,
        placeOrder,
        addReview,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
