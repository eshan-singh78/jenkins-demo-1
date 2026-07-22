import React from 'react';
import { Hero } from './Hero';
import { CategoryShowcase } from './CategoryShowcase';
import { FeaturedProducts } from './FeaturedProducts';
import { CraftsmanshipStory } from './CraftsmanshipStory';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <CraftsmanshipStory />
    </div>
  );
};
