import { Review, UserProfile, Order } from '../types';

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'aura-sound-arc',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'July 14, 2026',
    title: 'Unbelievable acoustic soundstage and physical feel',
    comment:
      'The build quality is on par with $800 audiophile headphones. The active noise cancelling completely blocks my commute noise, and the soft gradients on the packaging and matte aluminum casing look divine.',
    verifiedPurchase: true,
    helpfulCount: 34,
  },
  {
    id: 'rev-2',
    productId: 'aura-sound-arc',
    userName: 'Sarah Lin',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'June 28, 2026',
    title: 'Cleanest design on my desk',
    comment:
      'I was hesitant at first because of the price, but after 2 weeks of daily 8-hour Zoom meetings and Spotify sessions, I cannot go back. Battery literally lasts all week.',
    verifiedPurchase: true,
    helpfulCount: 19,
  },
  {
    id: 'rev-3',
    productId: 'aura-monolith-bag',
    userName: 'David Miller',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'July 02, 2026',
    title: 'The ultimate travel and commuter bag',
    comment:
      'Fits my 16" MBP like a glove with zero sagging. The magnetic Fidlock clips feel ridiculously satisfying to snap open and close.',
    verifiedPurchase: true,
    helpfulCount: 22,
  },
  {
    id: 'rev-4',
    productId: 'aura-lumina-bar',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'July 18, 2026',
    title: 'Zero eye fatigue during late night coding',
    comment:
      'The light coverage across my 34-inch ultrawide monitor is balanced and warm. Wireless charging base is super fast too!',
    verifiedPurchase: true,
    helpfulCount: 15,
  },
];

export const MOCK_USER: UserProfile = {
  name: 'Elena Rostova',
  email: 'elena.rostova@aura-goods.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  memberSince: 'March 2025',
  rewardsPoints: 420,
  savedAddresses: [
    {
      firstName: 'Elena',
      lastName: 'Rostova',
      email: 'elena.rostova@aura-goods.com',
      phone: '+1 (555) 382-9102',
      address: '742 Montgomery St, Suite 800',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: 'United States',
    },
  ],
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-89421',
    date: 'July 12, 2026',
    status: 'Delivered',
    subtotal: 349,
    discount: 34.9,
    shippingFee: 0,
    tax: 28.27,
    total: 342.37,
    items: [
      {
        id: 'aura-sound-arc',
        productName: 'AURA Sound Arc Headphones',
        productImage:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
        colorName: 'Matte Obsidian',
        variantName: 'Standard Edition',
        price: 349,
        quantity: 1,
      },
    ],
    shippingAddress: {
      firstName: 'Elena',
      lastName: 'Rostova',
      email: 'elena.rostova@aura-goods.com',
      phone: '+1 (555) 382-9102',
      address: '742 Montgomery St, Suite 800',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: 'United States',
    },
    paymentMethod: 'Apple Pay (•••• 4921)',
    trackingNumber: '1Z9999999999999999',
    estimatedDelivery: 'July 15, 2026',
  },
  {
    id: 'ORD-81023',
    date: 'June 02, 2026',
    status: 'Delivered',
    subtotal: 189,
    discount: 0,
    shippingFee: 0,
    tax: 16.06,
    total: 205.06,
    items: [
      {
        id: 'aura-lumina-bar',
        productName: 'Lumina Linear Desk Light',
        productImage:
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80',
        colorName: 'Ceramic White',
        price: 189,
        quantity: 1,
      },
    ],
    shippingAddress: {
      firstName: 'Elena',
      lastName: 'Rostova',
      email: 'elena.rostova@aura-goods.com',
      phone: '+1 (555) 382-9102',
      address: '742 Montgomery St, Suite 800',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: 'United States',
    },
    paymentMethod: 'Credit Card (•••• 8821)',
    trackingNumber: '1Z8888888888888888',
    estimatedDelivery: 'June 05, 2026',
  },
];

export const FAQ_ITEMS = [
  {
    category: 'Shipping & Delivery',
    question: 'How fast will my order ship?',
    answer:
      'All orders placed before 2:00 PM EST ship same-day from our modern fulfillment hubs in California and Rotterdam. Free express 2-3 day shipping applies automatically on all orders over $75.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to over 65 countries worldwide with prepaid duties & taxes at checkout, ensuring zero unexpected customs fees upon arrival.',
  },
  {
    category: 'Returns & Warranty',
    question: 'What is your trial & return policy?',
    answer:
      'We offer a 30-day risk-free home trial on all products. If you aren’t 100% satisfied with your AURA object, return it in original condition for a full refund. We provide prepaid return labels.',
  },
  {
    category: 'Returns & Warranty',
    question: 'How does the Lifetime Guarantee work?',
    answer:
      'Our Carry & Hardware products are built for decades of daily use. We cover any manufacturing defects, zipper failures, or material fatigue for the life of the product.',
  },
  {
    category: 'Materials & Sustainability',
    question: 'How are AURA products manufactured sustainably?',
    answer:
      'We utilize 100% recycled aluminum, bio-plastics, and vegetable-tanned leather. Every shipment is 100% carbon neutral through offset projects with Climeworks and NativeEnergy.',
  },
];

export const VALID_PROMO_CODES: Record<string, { discountPercent?: number; discountFixed?: number; label: string }> = {
  AURA10: { discountPercent: 10, label: '10% OFF Sitewide' },
  WELCOME20: { discountFixed: 20, label: '$20 OFF Welcome Discount' },
  FREESHIP: { discountPercent: 5, label: 'Free Express Shipping + 5% OFF' },
};
