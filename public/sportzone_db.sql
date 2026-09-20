-- ==========================================================
-- SPORTZONE DATABASE SCHEMA & INITIAL DEMO DATA
-- For XAMPP / MySQL / phpMyAdmin Full-Stack College Project
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `sportzone_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sportzone_db`;

-- 1. Users Table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(20) DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('customer', 'admin') DEFAULT 'customer',
  `address` TEXT DEFAULT NULL,
  `city` VARCHAR(50) DEFAULT NULL,
  `state` VARCHAR(50) DEFAULT NULL,
  `pincode` VARCHAR(10) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Categories Table
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `sport` VARCHAR(50) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB;

-- 3. Brands Table
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `tagline` VARCHAR(150) DEFAULT NULL,
  `specialty` VARCHAR(100) DEFAULT NULL
) ENGINE=InnoDB;

-- 4. Products Table
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `sport` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `original_price` DECIMAL(10,2) NOT NULL,
  `discount_percent` INT DEFAULT 0,
  `stock` INT NOT NULL DEFAULT 10,
  `rating` DECIMAL(2,1) DEFAULT 4.5,
  `review_count` INT DEFAULT 0,
  `image_url` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `is_trending` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Orders Table
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `user_id` INT NOT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_email` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(20) NOT NULL,
  `address` TEXT NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `pincode` VARCHAR(10) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  `discount` DECIMAL(10,2) DEFAULT 0.00,
  `shipping` DECIMAL(10,2) DEFAULT 0.00,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `payment_method` ENUM('UPI', 'Card', 'COD') NOT NULL,
  `status` ENUM('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Confirmed',
  `tracking_number` VARCHAR(50) DEFAULT NULL,
  `courier` VARCHAR(50) DEFAULT 'BlueDart Express',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Order Items Table
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(50) NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(200) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `quantity` INT NOT NULL,
  `selected_size` VARCHAR(20) DEFAULT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Reviews Table
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT DEFAULT NULL,
  `user_name` VARCHAR(100) NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- SEED INITIAL DATA
-- ---------------------------------------------------------

-- Insert Default Admin and User
-- Passwords hashed: 'admin123' and 'password123'
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `address`, `city`, `state`, `pincode`) VALUES
(1, 'Super Admin', 'admin@sportzone.com', '9876543210', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'admin', 'SportZone Stadium Office', 'Bangalore', 'Karnataka', '560001'),
(2, 'Rahul Sharma', 'rahul@example.com', '9812345678', '$2y$10$4B9Y8qK1P4H14Ffgw6qSmeZq84c8G7D08K3bF/Y8k8P0z84q/8y0m', 'customer', 'Flat 402, Green Glen Layout, Outer Ring Road', 'Bangalore', 'Karnataka', '560103');

-- Insert Sample Products
INSERT INTO `products` (`id`, `name`, `brand`, `category`, `sport`, `price`, `original_price`, `discount_percent`, `stock`, `rating`, `review_count`, `image_url`, `description`, `is_trending`) VALUES
(1, 'MRF Grand Edition English Willow Cricket Bat', 'MRF', 'Cricket Bats', 'Cricket', 18999.00, 22999.00, 17, 8, 4.9, 84, 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?q=80&w=800&auto=format&fit=crop', 'Grade 1 premium English Willow with massive edges and dynamic power sweet spot.', 1),
(2, 'SG Pro Match White Leather Cricket Ball (Box of 4)', 'SG', 'Cricket Balls', 'Cricket', 2499.00, 3199.00, 22, 25, 4.8, 112, 'https://images.unsplash.com/photo-1589801258579-18e091f4ca26?q=80&w=800&auto=format&fit=crop', 'Alum tanned high abrasion leather ball engineered for 50-over matches.', 0),
(3, 'Nivia Storm Thermobonded Match Football', 'Nivia', 'Footballs', 'Football', 1299.00, 1799.00, 28, 40, 4.8, 156, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop', 'FIFA Pro specification 32-panel thermobonded ball with seamless water resistance.', 1),
(4, 'Yonex Astrox 99 Pro Badminton Racket', 'Yonex', 'Badminton Rackets', 'Badminton', 14999.00, 18500.00, 19, 12, 4.9, 98, 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop', 'Rotational Generator System head-heavy power badminton racket designed for steep smashes.', 1),
(5, 'Adidas Predator Accuracy Firm Ground Cleats', 'Adidas', 'Football Shoes', 'Football', 8999.00, 11999.00, 25, 14, 4.8, 47, 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop', 'High definition grip rubber strikescale technology with lightweight sprintframe.', 1);
