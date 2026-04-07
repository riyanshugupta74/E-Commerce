import { Product, Category, User, Order } from "../types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Silk Evening Gown",
    description: "A stunning floor-length evening gown made from 100% pure mulberry silk. Features a delicate cowl neck and an elegant open back.",
    price: 850,
    originalPrice: 1200,
    category: "Dresses",
    images: [
      "https://picsum.photos/seed/dress1/800/1200",
      "https://picsum.photos/seed/dress1b/800/1200",
      "https://picsum.photos/seed/dress1c/800/1200"
    ],
    rating: 4.9,
    reviews: 124,
    colors: ["Midnight Blue", "Emerald", "Champagne"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isTrending: true,
    stock: 15
  },
  {
    id: "2",
    name: "Cashmere Overcoat",
    description: "Luxurious double-breasted overcoat crafted from premium Italian cashmere. Perfect for sophisticated winter layering.",
    price: 1450,
    category: "Jackets",
    images: [
      "https://picsum.photos/seed/coat1/800/1200",
      "https://picsum.photos/seed/coat1b/800/1200"
    ],
    rating: 4.8,
    reviews: 89,
    colors: ["Camel", "Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL"],
    isTrending: true,
    stock: 8
  },
  {
    id: "3",
    name: "Leather Chelsea Boots",
    description: "Handcrafted leather boots with a sleek profile and durable elastic side panels. Features a premium leather sole.",
    price: 320,
    originalPrice: 450,
    category: "Shoes",
    images: [
      "https://picsum.photos/seed/shoes1/800/1200",
      "https://picsum.photos/seed/shoes1b/800/1200"
    ],
    rating: 4.7,
    reviews: 210,
    colors: ["Tan", "Dark Brown", "Black"],
    sizes: ["7", "8", "9", "10", "11"],
    isNew: true,
    stock: 45
  },
  {
    id: "4",
    name: "Merino Wool Sweater",
    description: "Fine-knit sweater made from ultra-soft merino wool. Breathable, warm, and naturally odor-resistant.",
    price: 180,
    category: "Tops",
    images: [
      "https://picsum.photos/seed/sweater1/800/1200",
      "https://picsum.photos/seed/sweater1b/800/1200"
    ],
    rating: 4.6,
    reviews: 156,
    colors: ["Navy", "Grey", "Burgundy"],
    sizes: ["S", "M", "L", "XL"],
    stock: 60
  },
  {
    id: "5",
    name: "Tailored Linen Trousers",
    description: "Lightweight linen trousers with a sharp, tailored fit. Ideal for warm-weather elegance.",
    price: 240,
    category: "Pants",
    images: [
      "https://picsum.photos/seed/pants1/800/1200"
    ],
    rating: 4.5,
    reviews: 78,
    colors: ["White", "Beige", "Navy"],
    sizes: ["30", "32", "34", "36"],
    isNew: true,
    stock: 25
  },
  {
    id: "6",
    name: "Classic White Poplin Shirt",
    description: "The essential white shirt, crafted from crisp cotton poplin with a modern slim fit.",
    price: 120,
    category: "Tops",
    images: [
      "https://picsum.photos/seed/shirt1/800/1200"
    ],
    rating: 4.9,
    reviews: 432,
    colors: ["White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isTrending: true,
    stock: 120
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Dresses", image: "https://picsum.photos/seed/cat_dresses/400/600", count: 124 },
  { id: "2", name: "Tops", image: "https://picsum.photos/seed/cat_tops/400/600", count: 342 },
  { id: "3", name: "Jackets", image: "https://picsum.photos/seed/cat_jackets/400/600", count: 86 },
  { id: "4", name: "Shoes", image: "https://picsum.photos/seed/cat_shoes/400/600", count: 156 },
  { id: "5", name: "Pants", image: "https://picsum.photos/seed/cat_pants/400/600", count: 94 },
  { id: "6", name: "Accessories", image: "https://picsum.photos/seed/cat_acc/400/600", count: 210 }
];

export const MOCK_USER: User = {
  name: "Alexander Pierce",
  email: "alex.pierce@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  points: 2450,
  tier: "Gold"
};

export const MOCK_ORDERS: Order[] = [
  { id: "ORD-7421", date: "2024-03-15", status: "Delivered", total: 1240, items: 3 },
  { id: "ORD-8932", date: "2024-03-28", status: "Shipped", total: 450, items: 1 },
  { id: "ORD-9210", date: "2024-04-02", status: "Processing", total: 850, items: 1 }
];
