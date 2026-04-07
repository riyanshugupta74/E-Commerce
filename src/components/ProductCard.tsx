import React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  className?: string;
  key?: React.Key;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('group relative flex flex-col', className)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-cream rounded-sm">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-luxury-black text-[10px] uppercase tracking-widest px-2 py-1 font-bold shadow-sm">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-luxury-gold text-white text-[10px] uppercase tracking-widest px-2 py-1 font-bold shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-luxury-black hover:bg-luxury-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-luxury-black py-2 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-3 h-3" /> Add to Cart
            </button>
            <Link 
              to={`/product/${product.id}`}
              className="p-2 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-luxury-black transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-luxury-gold text-luxury-gold" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="text-sm font-medium hover:text-luxury-gold transition-colors line-clamp-1">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-luxury-black/30 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
