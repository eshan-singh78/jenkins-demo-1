export type CategoryId = 'all' | 'audio-tech' | 'workspace' | 'carry-travel' | 'lifestyle';

export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface VariantOption {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: CategoryId;
  categoryName: string;
  tags: string[];
  badge?: 'Bestseller' | 'New' | 'Sale' | 'Limited Edition';
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: ColorOption[];
  variants?: VariantOption[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + color + variant)
  product: Product;
  selectedColor: ColorOption;
  selectedVariant?: VariantOption;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  colorName: string;
  variantName?: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'In Transit';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  rewardsPoints: number;
  savedAddresses: ShippingAddress[];
}

export interface FilterState {
  searchQuery: string;
  category: CategoryId;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // conversion rate relative to USD
}

export type PageView =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms';
