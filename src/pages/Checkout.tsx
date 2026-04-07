import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, MapPin, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    shipping: 'standard',
    paymentMethod: 'card'
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      toast.success("Order placed successfully!");
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-cream/30">
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-12">
        <div className="flex items-center justify-between mb-12">
          <Link to="/cart" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-luxury-gold transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Bag
          </Link>
          <div className="flex items-center gap-4">
            <Lock className="w-4 h-4 text-luxury-black/30" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Form */}
          <div className="lg:col-span-8 space-y-12">
            {/* Steps Indicator */}
            <div className="flex justify-between items-center max-w-md mx-auto mb-16 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-luxury-black/10 -z-10" />
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500",
                    step >= s ? "bg-luxury-black text-white scale-110" : "bg-white text-luxury-black/30 border border-luxury-black/10"
                  )}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-luxury-black text-white rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Shipping Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">Email Address</label>
                      <input type="email" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">First Name</label>
                      <input type="text" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">Last Name</label>
                      <input type="text" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">Address</label>
                      <input type="text" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">City</label>
                      <input type="text" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">ZIP / Postal Code</label>
                      <input type="text" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-luxury-black text-white rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Shipping Method</h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'standard', name: 'Standard Delivery', time: '3-5 Business Days', price: 'Free' },
                      { id: 'express', name: 'Express Delivery', time: '1-2 Business Days', price: '$25.00' },
                      { id: 'overnight', name: 'Overnight Delivery', time: 'Next Business Day', price: '$45.00' }
                    ].map((method) => (
                      <label 
                        key={method.id}
                        className={cn(
                          "flex items-center justify-between p-6 border cursor-pointer transition-all",
                          formData.shipping === method.id ? "border-luxury-gold bg-luxury-gold/5" : "border-luxury-black/10 hover:border-luxury-black"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <input 
                            type="radio" 
                            name="shipping" 
                            checked={formData.shipping === method.id}
                            onChange={() => setFormData({ ...formData, shipping: method.id })}
                            className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold"
                          />
                          <div>
                            <p className="text-sm font-bold">{method.name}</p>
                            <p className="text-xs text-luxury-black/40 uppercase tracking-widest font-medium">{method.time}</p>
                          </div>
                        </div>
                        <span className="font-bold text-sm">{method.price}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-luxury-black text-white rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Payment Method</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="p-8 border border-luxury-gold bg-luxury-gold/5 rounded-sm space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest">Credit / Debit Card</span>
                        <div className="flex gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">Card Number</label>
                          <input type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">Expiry Date</label>
                            <input type="text" placeholder="MM / YY" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">CVV</label>
                            <input type="text" placeholder="•••" className="w-full bg-white border border-luxury-black/10 px-4 py-3 text-sm focus:ring-1 focus:ring-luxury-gold outline-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-center gap-4 p-6 border border-luxury-black/10 rounded-sm cursor-pointer hover:border-luxury-black transition-all">
                      <input type="radio" name="payment" className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                      <span className="text-sm font-bold">PayPal</span>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-12 flex justify-between">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="px-10 py-4 text-xs font-bold uppercase tracking-widest border border-luxury-black hover:bg-luxury-black hover:text-white transition-all"
                >
                  Previous
                </button>
              )}
              <button 
                onClick={handleNext}
                className="ml-auto bg-luxury-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all"
              >
                {step === 3 ? "Place Order" : "Continue"}
              </button>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 border border-luxury-black/5 rounded-sm space-y-8 sticky top-32">
              <h3 className="text-xl font-serif font-bold border-b border-luxury-black/5 pb-4">Order Summary</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-16 aspect-[3/4] bg-luxury-cream overflow-hidden flex-shrink-0">
                    <img src="https://picsum.photos/seed/dress1/200/300" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold truncate">Silk Evening Gown</h4>
                    <p className="text-[10px] text-luxury-black/40 uppercase tracking-widest font-bold mt-1">Size: M | Qty: 1</p>
                    <p className="text-sm font-bold mt-2">$850.00</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-luxury-black/5">
                <div className="flex justify-between text-xs">
                  <span className="text-luxury-black/40 uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="font-bold">$850.00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-luxury-black/40 uppercase tracking-widest font-bold">Shipping</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-luxury-black/40 uppercase tracking-widest font-bold">Tax</span>
                  <span className="font-bold">$68.00</span>
                </div>
                <div className="pt-4 flex justify-between items-center">
                  <span className="text-lg font-serif font-bold">Total</span>
                  <span className="text-xl font-serif font-bold">$918.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatePresence({ children, mode }: { children: React.ReactNode, mode?: 'wait' | 'popLayout' | 'sync' }) {
  return <>{children}</>;
}
