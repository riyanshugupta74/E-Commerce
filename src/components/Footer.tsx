import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-luxury-black text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-serif font-bold tracking-tighter">
            LUXE<span className="text-luxury-gold">MARKET</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Redefining luxury for the modern era. Curated collections from the world's most prestigious designers.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-luxury-gold transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-luxury-gold transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-luxury-gold transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-luxury-gold transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-serif text-lg mb-6">Collections</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/products?category=Dresses" className="hover:text-white transition-colors">Dresses</Link></li>
            <li><Link to="/products?category=Tops" className="hover:text-white transition-colors">Tops & Blouses</Link></li>
            <li><Link to="/products?category=Jackets" className="hover:text-white transition-colors">Outerwear</Link></li>
            <li><Link to="/products?category=Shoes" className="hover:text-white transition-colors">Footwear</Link></li>
            <li><Link to="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-serif text-lg mb-6">Customer Care</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="font-serif text-lg">Newsletter</h4>
          <p className="text-white/60 text-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-none focus:ring-1 focus:ring-luxury-gold text-sm px-4 py-3 flex-1"
            />
            <button className="bg-luxury-gold px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-all">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
        <p>© 2024 LUXEMARKET. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
