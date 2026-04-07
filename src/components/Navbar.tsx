import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X, Moon, Sun, Mic } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'New Arrivals', path: '/products?filter=new' },
    { name: 'Dresses', path: '/products?category=Dresses' },
    { name: 'Tops', path: '/products?category=Tops' },
    { name: 'Jackets', path: '/products?category=Jackets' },
    { name: 'Sale', path: '/products?filter=sale' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between',
        isScrolled ? 'bg-luxury-paper/80 backdrop-blur-md border-b border-luxury-black/5 py-3' : 'bg-transparent'
      )}
    >
      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Logo */}
      <Link to="/" className="text-2xl font-serif font-bold tracking-tighter">
        LUXE<span className="text-luxury-gold">MARKET</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-xs uppercase tracking-widest font-medium hover:text-luxury-gold transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="hidden lg:flex items-center bg-luxury-cream/50 rounded-full px-4 py-1.5 border border-luxury-black/5">
          <Search className="w-4 h-4 text-luxury-black/40" />
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="bg-transparent border-none focus:ring-0 text-xs px-2 w-40 placeholder:text-luxury-black/30"
          />
          <Mic className="w-4 h-4 text-luxury-black/40 cursor-pointer hover:text-luxury-gold transition-colors" />
        </div>
        
        <button onClick={toggleDarkMode} className="p-2 hover:text-luxury-gold transition-colors">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <Link to="/dashboard" className="p-2 hover:text-luxury-gold transition-colors">
          <User className="w-5 h-5" />
        </Link>
        
        <Link to="/cart" className="p-2 hover:text-luxury-gold transition-colors relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-1 right-1 bg-luxury-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            2
          </span>
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-luxury-paper z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif font-bold tracking-tighter">LUXE</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif hover:text-luxury-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-luxury-black/10" />
              <Link to="/dashboard" className="text-lg font-medium">My Account</Link>
              <Link to="/wishlist" className="text-lg font-medium">Wishlist</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
