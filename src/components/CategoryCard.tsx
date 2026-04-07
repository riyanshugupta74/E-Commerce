import React from 'react';
import { Category } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface CategoryCardProps {
  category: Category;
  key?: React.Key;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      to={`/products?category=${category.name}`}
      className="group relative aspect-[4/5] overflow-hidden bg-luxury-cream rounded-sm"
    >
      <img
        src={category.image}
        alt={category.name}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
        <h3 className="text-3xl font-serif font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {category.name}
        </h3>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {category.count} Items
        </span>
      </div>
    </Link>
  );
}
