import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, BarChart3, 
  Search, Plus, MoreVertical, TrendingUp, DollarSign, 
  ArrowUpRight, ArrowDownRight, Filter, Download
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../data/mockData';
import { cn } from '../lib/utils';

const DATA = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 15 },
  { name: 'Thu', sales: 2780, orders: 20 },
  { name: 'Fri', sales: 1890, orders: 12 },
  { name: 'Sat', sales: 2390, orders: 16 },
  { name: 'Sun', sales: 3490, orders: 22 },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-luxury-cream/20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-black text-white p-8 flex flex-col fixed h-screen">
        <div className="text-2xl font-serif font-bold tracking-tighter mb-12">
          LUXE<span className="text-luxury-gold">ADMIN</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
            { id: 'products', icon: <Package className="w-4 h-4" />, label: 'Products' },
            { id: 'orders', icon: <ShoppingCart className="w-4 h-4" />, label: 'Orders' },
            { id: 'users', icon: <Users className="w-4 h-4" />, label: 'Customers' },
            { id: 'analytics', icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-all rounded-sm",
                activeTab === item.id 
                  ? "bg-luxury-gold text-white" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10">
          <button className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
            <Plus className="w-4 h-4" /> New Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold capitalize">{activeTab} Overview</h1>
            <p className="text-xs text-luxury-black/40 uppercase tracking-widest font-bold mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-black/30" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-white border border-luxury-black/10 pl-10 pr-4 py-2 text-xs rounded-sm focus:ring-1 focus:ring-luxury-gold outline-none w-64"
              />
            </div>
            <button className="bg-luxury-black text-white px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-luxury-gold transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', up: true, icon: <DollarSign className="w-5 h-5" /> },
                { label: 'Total Orders', value: '1,240', trend: '+8.2%', up: true, icon: <ShoppingCart className="w-5 h-5" /> },
                { label: 'Active Users', value: '4,850', trend: '-2.4%', up: false, icon: <Users className="w-5 h-5" /> },
                { label: 'Avg. Order Value', value: '$450', trend: '+5.1%', up: true, icon: <TrendingUp className="w-5 h-5" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-luxury-black/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-luxury-cream rounded-lg text-luxury-gold">
                      {stat.icon}
                    </div>
                    <div className={cn(
                      "flex items-center text-[10px] font-bold",
                      stat.up ? "text-green-500" : "text-red-500"
                    )}>
                      {stat.trend} {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40 mb-1">{stat.label}</p>
                  <p className="text-2xl font-serif font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white p-8 rounded-sm shadow-sm border border-luxury-black/5">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-serif font-bold">Revenue Growth</h3>
                  <select className="text-[10px] uppercase tracking-widest font-bold border-none bg-luxury-cream px-3 py-1 rounded-sm outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontSize: 12, fontWeight: 700 }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-8 rounded-sm shadow-sm border border-luxury-black/5">
                <h3 className="text-xl font-serif font-bold mb-8">Top Categories</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Dresses', value: 45, color: '#D4AF37' },
                    { label: 'Outerwear', value: 25, color: '#1A1A1A' },
                    { label: 'Footwear', value: 20, color: '#8E9299' },
                    { label: 'Accessories', value: 10, color: '#E4E3E0' }
                  ].map((cat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                        <span>{cat.label}</span>
                        <span>{cat.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-luxury-cream rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${cat.value}%`, backgroundColor: cat.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-sm shadow-sm border border-luxury-black/5 overflow-hidden">
              <div className="p-8 flex justify-between items-center border-b border-luxury-black/5">
                <h3 className="text-xl font-serif font-bold">Recent Transactions</h3>
                <button className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold hover:underline">View All Orders</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-luxury-cream/50 text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">
                    <tr>
                      <th className="px-8 py-4">Order ID</th>
                      <th className="px-8 py-4">Customer</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Amount</th>
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-luxury-black/5">
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-luxury-cream/20 transition-colors">
                        <td className="px-8 py-4 text-xs font-bold">{order.id}</td>
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold text-[10px] font-bold">AP</div>
                            <span className="text-xs font-medium">Alex Pierce</span>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            "text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full",
                            order.status === 'Delivered' ? "bg-green-100 text-green-700" : "bg-luxury-gold/10 text-luxury-gold"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-xs font-bold">${order.total}</td>
                        <td className="px-8 py-4 text-xs text-luxury-black/40">{order.date}</td>
                        <td className="px-8 py-4 text-right">
                          <button className="p-2 hover:text-luxury-gold transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white p-8 rounded-sm shadow-sm border border-luxury-black/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif font-bold">Product Inventory</h3>
              <button className="bg-luxury-black text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-luxury-gold transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PRODUCTS.map(product => (
                <div key={product.id} className="flex gap-4 p-4 border border-luxury-black/5 rounded-sm group hover:border-luxury-gold transition-all">
                  <div className="w-20 aspect-[3/4] bg-luxury-cream overflow-hidden rounded-sm">
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold truncate">{product.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold mt-1">{product.category}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold">${product.price}</span>
                      <span className={cn(
                        "text-[10px] font-bold",
                        product.stock < 10 ? "text-red-500" : "text-green-500"
                      )}>
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
