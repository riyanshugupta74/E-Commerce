import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/luxury_hero/1920/1080" 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 px-6 md:px-12 max-w-4xl text-white">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.4em] font-bold mb-6 block"
          >
            Spring / Summer 2024
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-[0.9]"
          >
            The Art of <br /> <span className="italic text-luxury-gold">Elegance</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl font-light leading-relaxed"
          >
            Discover our curated collection of premium designer pieces, where timeless craftsmanship meets modern sophistication.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <Link 
              to="/products" 
              className="bg-white text-luxury-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all flex items-center gap-3"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-luxury-gold transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                <Play className="w-4 h-4 fill-white" />
              </div>
              Watch Film
            </button>
          </motion.div>
        </div>
      </section>

      {/* Category Carousel */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold mb-2 block">Explore</span>
            <h2 className="text-4xl font-serif font-bold">Shop by Category</h2>
          </div>
          <Link to="/products" className="text-xs font-bold uppercase tracking-widest border-b border-luxury-black pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-all">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CATEGORIES.slice(0, 3).map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Deals / Countdown */}
      <section className="bg-luxury-cream py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <img 
              src="https://picsum.photos/seed/deal/800/800" 
              alt="Deal" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-8 left-8 bg-white p-6 shadow-xl">
              <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold mb-2 block">Limited Offer</span>
              <h3 className="text-3xl font-serif font-bold mb-4">Summer Essentials</h3>
              <p className="text-4xl font-serif italic text-luxury-gold">30% OFF</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl font-serif font-bold leading-tight">Exclusive Seasonal <br /> Flash Sale</h2>
            <p className="text-luxury-black/60 leading-relaxed">
              Our most coveted pieces are now available at exceptional prices. Don't miss your chance to own timeless luxury.
            </p>
            
            <div className="flex gap-6">
              {[
                { label: 'Days', value: '02' },
                { label: 'Hours', value: '14' },
                { label: 'Mins', value: '35' },
                { label: 'Secs', value: '12' }
              ].map(item => (
                <div key={item.label} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl font-serif font-bold shadow-sm mb-2">
                    {item.value}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/products?filter=sale" 
              className="inline-block bg-luxury-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold mb-2 block">Curated</span>
            <h2 className="text-4xl font-serif font-bold">New Arrivals</h2>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full border border-luxury-black/10 flex items-center justify-center hover:bg-luxury-black hover:text-white transition-all">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full border border-luxury-black/10 flex items-center justify-center hover:bg-luxury-black hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.filter(p => p.isNew).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-4 block">Popular Now</span>
          <h2 className="text-5xl font-serif font-bold">Trending Collections</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {MOCK_PRODUCTS.filter(p => p.isTrending).slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link 
            to="/products" 
            className="inline-block border border-luxury-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-all"
          >
            Explore All Products
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-luxury-black/5 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: <Star className="w-6 h-6" />, title: 'Premium Quality', desc: 'Crafted from the finest materials' },
            { icon: <Clock className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Global shipping within 3-5 days' },
            { icon: <ArrowRight className="w-6 h-6" />, title: 'Easy Returns', desc: '30-day hassle-free return policy' },
            { icon: <Star className="w-6 h-6" />, title: 'Secure Payment', desc: '100% encrypted payment processing' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4">
              <div className="text-luxury-gold">{item.icon}</div>
              <h4 className="font-serif text-lg font-bold">{item.title}</h4>
              <p className="text-xs text-luxury-black/40 uppercase tracking-widest font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
