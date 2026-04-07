import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Cart() {
  const [items, setItems] = useState([
    { ...MOCK_PRODUCTS[0], quantity: 1, selectedSize: 'M', selectedColor: 'Emerald' },
    { ...MOCK_PRODUCTS[2], quantity: 1, selectedSize: '9', selectedColor: 'Tan' }
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="bg-luxury-cream p-8 rounded-full mb-8">
          <ShoppingBag className="w-12 h-12 text-luxury-black/20" />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4">Your bag is empty</h2>
        <p className="text-luxury-black/40 mb-8 text-center max-w-xs uppercase tracking-widest text-[10px] font-bold">
          Items added to your bag will appear here.
        </p>
        <Link 
          to="/products" 
          className="bg-luxury-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto py-12">
      <h1 className="text-4xl font-serif font-bold mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-8">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-luxury-black/5 text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {items.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-8 border-b border-luxury-black/5"
            >
              <div className="col-span-1 md:col-span-6 flex gap-6">
                <div className="w-24 aspect-[3/4] overflow-hidden bg-luxury-cream flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold mb-1">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="text-lg font-serif font-bold hover:text-luxury-gold transition-colors">{item.name}</Link>
                  <div className="mt-2 flex gap-4 text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">
                    <span>Size: {item.selectedSize}</span>
                    <span>Color: {item.selectedColor}</span>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-center font-bold">
                ${item.price}
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-center">
                <div className="flex items-center border border-luxury-black/10">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-2 hover:text-luxury-gold transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-2 hover:text-luxury-gold transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-right font-serif font-bold text-lg">
                ${item.price * item.quantity}
              </div>
            </motion.div>
          ))}

          <div className="pt-8 flex justify-between items-center">
            <Link to="/products" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-luxury-gold transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
            </Link>
            <button 
              onClick={() => setItems([])}
              className="text-xs font-bold uppercase tracking-widest text-luxury-black/40 hover:text-luxury-black transition-colors"
            >
              Clear Bag
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-luxury-cream p-8 rounded-sm space-y-8 sticky top-32">
            <h3 className="text-xl font-serif font-bold border-b border-luxury-black/5 pb-4">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-luxury-black/60">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-luxury-black/60">Estimated Shipping</span>
                <span className="font-bold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-luxury-black/60">Tax</span>
                <span className="font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-luxury-black/5 flex justify-between items-center">
                <span className="text-lg font-serif font-bold">Total</span>
                <span className="text-2xl font-serif font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-black/30" />
                  <input 
                    type="text" 
                    placeholder="Promo Code" 
                    className="w-full bg-white border border-luxury-black/10 pl-10 pr-4 py-3 text-xs focus:ring-1 focus:ring-luxury-gold outline-none"
                  />
                </div>
                <button className="bg-luxury-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all">
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-luxury-black/40 uppercase tracking-widest font-bold">
                * Shipping and taxes calculated at checkout
              </p>
            </div>

            <Link 
              to="/checkout" 
              className="w-full bg-luxury-black text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all flex items-center justify-center gap-3"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex justify-center gap-4 opacity-30 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
