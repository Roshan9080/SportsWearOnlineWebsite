export type SportType =
  | 'Cricket'
  | 'Football'
  | 'Badminton'
  | 'Tennis'
  | 'Basketball'
  | 'Running'
  | 'Fitness'
  | 'Sportswear'
  | 'Sports Shoes';

export type BrandType =
  | 'MRF'
  | 'SG'
  | 'SS'
  | 'DSC'
  | 'Kookaburra'
  | 'Yonex'
  | 'Li-Ning'
  | 'Nivia'
  | 'Adidas'
  | 'Nike'
  | 'Puma'
  | 'Cosco';

export interface Product {
  id: number;
  name: string;
  brand: BrandType;
  category: string;
  sport: SportType;
  description: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  stock: number;
  image: string;
  additionalImages?: string[];
  rating: number;
  reviewCount: number;
  sizes?: string[];
  colors?: string[];
  specifications?: Record<string, string>;
  isTrending?: boolean;
  isFeatured?: boolean;
  isOffer?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  userId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  trackingCourier: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  joinedDate?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterState {
  searchQuery: string;
  sport: string;
  category: string;
  brand: string[];
  priceRange: string; // 'all' | 'under1k' | '1k-5k' | '5k-10k' | 'above10k'
  minRating: number; // 0, 3, 4, 5
  availability: 'all' | 'inStock' | 'outOfStock';
  sortBy: 'recommended' | 'priceLowToHigh' | 'priceHighToLow' | 'newest' | 'highestRated';
}
