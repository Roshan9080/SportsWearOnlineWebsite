import { BrandType, SportType } from '../types';

export interface CategoryInfo {
  name: SportType;
  title: string;
  description: string;
  image: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Cricket',
    title: 'Cricket Equipment',
    description: 'English willow bats, protective gear, leather balls & match accessories.',
    image: 'https://images.unsplash.com/photo-1531415074868-036b1c5f53ec?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Cricket Bats',
      'Cricket Balls',
      'Batting Gloves',
      'Batting Pads',
      'Helmets',
      'Cricket Shoes',
      'Cricket Bags',
      'Cricket Jerseys',
      'Protective Equipment',
    ],
  },
  {
    name: 'Football',
    title: 'Football Gear',
    description: 'Match balls, professional cleat studs, goalkeeper gloves & training kits.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Footballs',
      'Football Shoes',
      'Jerseys',
      'Shin Guards',
      'Goalkeeper Gloves',
      'Football Socks',
      'Bags',
    ],
  },
  {
    name: 'Badminton',
    title: 'Badminton & Rackets',
    description: 'High-tension carbon graphite rackets, goose feather shuttles & kitbags.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Badminton Rackets',
      'Shuttlecocks',
      'Shoes',
      'Bags',
      'Grips',
      'Nets',
    ],
  },
  {
    name: 'Tennis',
    title: 'Tennis Equipment',
    description: 'Precision control rackets, pressurized tour balls & court footwear.',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Tennis Rackets',
      'Tennis Balls',
      'Tennis Shoes',
      'Tennis Bags',
      'Grips',
    ],
  },
  {
    name: 'Basketball',
    title: 'Basketball Gear',
    description: 'Composite leather indoor/outdoor basketballs, pro hoops & jerseys.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Basketballs',
      'Basketball Shoes',
      'Jerseys',
      'Accessories',
    ],
  },
  {
    name: 'Running',
    title: 'Running & Marathon',
    description: 'Responsive foam running shoes, hydration vests & technical wear.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Running Shoes',
      'Running Shorts',
      'Hydration Gear',
      'Compression Socks',
    ],
  },
  {
    name: 'Fitness',
    title: 'Gym & Fitness Gear',
    description: 'Rubber hex dumbbells, heavy-duty resistance bands, yoga mats & gloves.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Dumbbells',
      'Resistance Bands',
      'Yoga Mats',
      'Skipping Ropes',
      'Gym Gloves',
      'Fitness Accessories',
    ],
  },
  {
    name: 'Sportswear',
    title: 'Performance Sportswear',
    description: 'Quick-dry activewear, compression base layers, track pants & windbreakers.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'T-Shirts',
      'Jerseys',
      'Shorts',
      'Track Pants',
      'Jackets',
      'Socks',
    ],
  },
];

export interface BrandInfo {
  name: BrandType;
  tagline: string;
  country: string;
  specialty: string;
}

export const BRANDS: BrandInfo[] = [
  { name: 'MRF', tagline: 'Pace & Power', country: 'India', specialty: 'Pro Cricket Bats & Willow' },
  { name: 'SG', tagline: 'Believe. Become.', country: 'India', specialty: 'Test Match Cricket Equipment' },
  { name: 'SS', tagline: 'Since 1969', country: 'India', specialty: 'English Willow & Protective Gear' },
  { name: 'DSC', tagline: 'Fearless Spirit', country: 'India', specialty: 'Modern Bat Profiles & Accessories' },
  { name: 'Kookaburra', tagline: 'The Choice of Champions', country: 'Australia', specialty: 'Turf Balls & Premium Bats' },
  { name: 'Yonex', tagline: 'Far Beyond Ordinary', country: 'Japan', specialty: 'World #1 Badminton & Tennis' },
  { name: 'Li-Ning', tagline: 'Anything is Possible', country: 'China', specialty: 'Dynamic Badminton & Sportswear' },
  { name: 'Nivia', tagline: 'Step Out & Play', country: 'India', specialty: 'FIFA Approved Footballs & Gear' },
  { name: 'Adidas', tagline: 'Impossible is Nothing', country: 'Germany', specialty: 'Football Studs, Shoes & Apparel' },
  { name: 'Nike', tagline: 'Just Do It', country: 'USA', specialty: 'Elite Sportswear, Running & Kicks' },
  { name: 'Puma', tagline: 'Forever Faster', country: 'Germany', specialty: 'Athletic Running Shoes & Gear' },
  { name: 'Cosco', tagline: 'Game For Real', country: 'India', specialty: 'Balls, Fitness Gear & Rackets' },
];
