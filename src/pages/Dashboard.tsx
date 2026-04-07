import React from 'react';
import { User, Package, Heart, Settings, Award, ChevronRight, LogOut, Star, Clock } from 'lucide-react';
import { MOCK_USER, MOCK_ORDERS, MOCK_PRODUCTS } from '../data/mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-luxury-cream/20 pb-24">
      {/* Header */}
      <div className="bg-luxury-black text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-luxury-gold overflow-hidden">
              <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-luxury-gold text-white p-2 rounded-full shadow-lg">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-serif font-bold">{MOCK_USER.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold bg-white/10 px-3 py-1 rounded-full">
                {MOCK_USER.tier} Member
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold">
                {MOCK_USER.points} Reward Points
              </span>
            </div>
          </div>
          <div className="md:ml-auto flex gap-4">
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 text-[10px] uppercase tracking-widest font-bold transition-all">
              Edit Profile
            </button>
            <button className="bg-luxury-gold hover:bg-white hover:text-luxury-black px-6 py-3 text-[10px] uppercase tracking-widest font-bold transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto -mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-4">
          {[
            { icon: <User className="w-4 h-4" />, label: 'Profile Overview', active: true },
            { icon: <Package className="w-4 h-4" />, label: 'Order History' },
            { icon: <Heart className="w-4 h-4" />, label: 'My Wishlist' },
            { icon: <Award className="w-4 h-4" />, label: 'Rewards & Points' },
            { icon: <Settings className="w-4 h-4" />, label: 'Account Settings' }
          ].map((item, i) => (
            <button
              key={i}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-sm",
                item.active 
                  ? "bg-white text-luxury-black shadow-lg shadow-luxury-black/5" 
                  : "bg-white/50 text-luxury-black/40 hover:bg-white hover:text-luxury-black"
              )}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Orders', value: '12', icon: <Package className="w-5 h-5" /> },
              { label: 'Wishlist Items', value: '24', icon: <Heart className="w-5 h-5" /> },
              { label: 'Available Points', value: '2,450', icon: <Award className="w-5 h-5" /> }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-sm shadow-sm border border-luxury-black/5 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40 mb-2">{stat.label}</p>
                  <p className="text-3xl font-serif font-bold">{stat.value}</p>
                </div>
                <div className="text-luxury-gold opacity-20">{stat.icon}</div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-8 rounded-sm shadow-sm border border-luxury-black/5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold">Recent Orders</h2>
              <button className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-luxury-black/5 hover:border-luxury-gold transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-luxury-cream rounded-full flex items-center justify-center text-luxury-gold">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{order.id}</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">{order.date}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-12">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40 mb-1">Status</p>
                      <span className={cn(
                        "text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full",
                        order.status === 'Delivered' ? "bg-green-100 text-green-700" : "bg-luxury-gold/10 text-luxury-gold"
                      )}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40 mb-1">Total</p>
                      <p className="text-sm font-bold">${order.total}</p>
                    </div>
                    <button className="p-2 text-luxury-black/20 group-hover:text-luxury-gold transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification / Rewards */}
          <div className="bg-luxury-black text-white p-10 rounded-sm relative overflow-hidden">
            <div className="relative z-10 max-w-md space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">Luxe Rewards</span>
              <h2 className="text-3xl font-serif font-bold">You're 550 points away from <span className="italic text-luxury-gold">Platinum Tier</span></h2>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-luxury-gold w-[75%]" />
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-white/40">
                  <span>Gold</span>
                  <span>Platinum</span>
                </div>
              </div>
              <button className="bg-luxury-gold text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-luxury-black transition-all">
                Explore Benefits
              </button>
            </div>
            <Award className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
