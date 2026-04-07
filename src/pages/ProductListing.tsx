import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Grid, List as ListIcon, SlidersHorizontal } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const specialFilter = searchParams.get('filter');

  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFilter ? [categoryFilter] : []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesSpecial = !specialFilter || 
        (specialFilter === 'new' && p.isNew) || 
        (specialFilter === 'sale' && p.originalPrice) ||
        (specialFilter === 'trending' && p.isTrending);
      
      return matchesCategory && matchesPrice && matchesSpecial;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategories, priceRange, sortBy, specialFilter]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">
            {categoryFilter || specialFilter ? (
              <span className="capitalize">{categoryFilter || specialFilter} Collection</span>
            ) : "All Collections"}
          </h1>
          <p className="text-sm text-luxury-black/40 uppercase tracking-widest font-bold">
            Showing {filteredProducts.length} results
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-luxury-black/10 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          
          <div className="relative flex-1 md:flex-none">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-transparent border border-luxury-black/10 px-6 py-3 pr-12 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-luxury-gold outline-none"
            >
              <option value="featured">Sort By: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className={cn(
          "w-64 flex-shrink-0 space-y-10 hidden lg:block",
          isSidebarOpen ? "block" : "hidden"
        )}>
          {/* Categories */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 border-b border-luxury-black/5 pb-2">Categories</h3>
            <div className="space-y-3">
              {MOCK_CATEGORIES.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                    className="w-4 h-4 border-luxury-black/20 text-luxury-gold focus:ring-luxury-gold rounded-sm"
                  />
                  <span className="text-sm font-medium group-hover:text-luxury-gold transition-colors">{cat.name}</span>
                  <span className="ml-auto text-[10px] text-luxury-black/30 font-bold">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 border-b border-luxury-black/5 pb-2">Price Range</h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-luxury-gold"
              />
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-luxury-black/40">
                <span>$0</span>
                <span>Up to ${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 border-b border-luxury-black/5 pb-2">Rating</h3>
            <div className="space-y-3">
              {[5, 4, 3].map(rating => (
                <button key={rating} className="flex items-center gap-2 text-sm hover:text-luxury-gold transition-colors">
                  <div className="flex text-luxury-gold">
                    {Array.from({ length: rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <span className="text-xs font-medium">& Up</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-luxury-black/10 rounded-xl">
              <h3 className="text-2xl font-serif mb-4">No pieces found</h3>
              <p className="text-luxury-black/40 mb-8">Try adjusting your filters to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 2000]);
                }}
                className="text-xs font-bold uppercase tracking-widest border-b border-luxury-black pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-20 flex justify-center items-center gap-4">
              <button className="w-10 h-10 border border-luxury-black/10 flex items-center justify-center text-xs font-bold disabled:opacity-30" disabled>1</button>
              <button className="w-10 h-10 border border-luxury-black/10 flex items-center justify-center text-xs font-bold hover:bg-luxury-black hover:text-white transition-all">2</button>
              <button className="w-10 h-10 border border-luxury-black/10 flex items-center justify-center text-xs font-bold hover:bg-luxury-black hover:text-white transition-all">3</button>
              <span className="text-luxury-black/30">...</span>
              <button className="w-10 h-10 border border-luxury-black/10 flex items-center justify-center text-xs font-bold hover:bg-luxury-black hover:text-white transition-all">12</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string; key?: React.Key }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
    </svg>
  );
}
