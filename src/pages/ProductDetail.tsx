import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-serif mb-4">Product Not Found</h2>
        <Link to="/products" className="text-luxury-gold underline">Back to Collections</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    toast.success(`${product.name} added to bag!`);
  };

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <div className="px-6 md:px-12 py-6 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">
        <Link to="/" className="hover:text-luxury-black transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-luxury-black transition-colors">Collections</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/products?category=${product.category}`} className="hover:text-luxury-black transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-luxury-black">{product.name}</span>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Image Gallery */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "w-20 aspect-[3/4] overflow-hidden border-2 transition-all",
                  selectedImage === i ? "border-luxury-gold" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-luxury-cream order-1 md:order-2 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {/* Zoom Hint */}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-bold mb-4 block">
                {product.category}
              </span>
              <div className="flex gap-4">
                <button className="p-2 hover:text-luxury-gold transition-colors"><Share2 className="w-5 h-5" /></button>
                <button className="p-2 hover:text-luxury-gold transition-colors"><Heart className="w-5 h-5" /></button>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-luxury-gold text-luxury-gold" : "text-luxury-black/10")} />
                ))}
              </div>
              <span className="text-xs font-bold text-luxury-black/40 uppercase tracking-widest">{product.reviews} Reviews</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-serif font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-luxury-black/30 line-through font-serif">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-luxury-black/60 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-bold">Color: <span className="text-luxury-black/40">{selectedColor}</span></h4>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                    selectedColor === color ? "border-luxury-gold" : "border-transparent"
                  )}
                >
                  <div className="w-full h-full rounded-full bg-luxury-black/10" style={{ backgroundColor: color.toLowerCase() }} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] uppercase tracking-widest font-bold">Size</h4>
              <button className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "py-3 text-xs font-bold border transition-all",
                    selectedSize === size 
                      ? "bg-luxury-black text-white border-luxury-black" 
                      : "border-luxury-black/10 hover:border-luxury-black"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-4 pt-4">
            <div className="flex items-center border border-luxury-black/10">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-4 hover:text-luxury-gold transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-4 hover:text-luxury-gold transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-luxury-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>
          </div>

          <button className="w-full border border-luxury-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-all">
            Buy It Now
          </button>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-luxury-black/5">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-luxury-black/60">
              <Truck className="w-4 h-4 text-luxury-gold" /> Free Shipping
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-luxury-black/60">
              <RotateCcw className="w-4 h-4 text-luxury-gold" /> 30 Day Returns
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-luxury-black/60">
              <ShieldCheck className="w-4 h-4 text-luxury-gold" /> Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-4 block">You May Also Like</span>
          <h2 className="text-4xl font-serif font-bold">Complete the Look</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.filter(p => p.id !== id).slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
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
