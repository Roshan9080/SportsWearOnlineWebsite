# SPORTZONE - College Web Development Project
## Sports Equipment & Sportswear E-Commerce Platform

### Tagline
**"Gear Up. Play Hard. Win More."**

---

## 📌 Technology Stack
* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5 / Tailwind CSS
* **Backend:** PHP 8+ (Procedural / OOP with MySQLi & Prepared Statements)
* **Database:** MySQL / MariaDB (InnoDB engine, utf8mb4)
* **Local Development Environment:** XAMPP / WAMP / LAMP stack
* **Editor / Tools:** Visual Studio Code, phpMyAdmin, Postman

---

## 🚀 How to Run the Project on Localhost with XAMPP

### Step 1: Install & Launch XAMPP
1. Download and install **XAMPP** from [apachefriends.org](https://www.apachefriends.org).
2. Open **XAMPP Control Panel**.
3. Click **Start** for **Apache** and **MySQL** modules.
4. Ensure both modules turn green with assigned ports (Apache: 80, 443 | MySQL: 3306).

### Step 2: Copy Project to `htdocs`
1. Navigate to your XAMPP installation directory:
   - Windows: `C:\xampp\htdocs\`
   - macOS: `/Applications/XAMPP/xamppfiles/htdocs/`
   - Linux: `/opt/lampp/htdocs/`
2. Create a folder named `sportzone`.
3. Copy all project files into `C:\xampp\htdocs\sportzone\`.

### Step 3: Import the MySQL Database Schema
1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click on the **Databases** tab in the top navigation bar.
3. In the "Create database" field, type: `sportzone_db` and click **Create**.
4. Select `sportzone_db` from the left sidebar.
5. Click on the **Import** tab.
6. Click **Choose File** and select `sportzone_db.sql` from your project folder.
7. Scroll to the bottom and click **Import** (or **Go**).
8. Verify that tables (`users`, `categories`, `brands`, `products`, `orders`, `order_items`, `reviews`) have been created.

### Step 4: Configure Database Connection
Open `backend/db.php` (or `config/db.php`) and confirm credentials:
```php
$db_host = "localhost";
$db_user = "root";
$db_pass = "";        // Default in XAMPP is blank
$db_name = "sportzone_db";
$db_port = 3306;
```

### Step 5: Launch the Application
Open your web browser and visit:
```
http://localhost/sportzone
```

---

## 🔑 Default Login Credentials

### 1. Customer Demo Account:
* **Email:** `rahul@example.com`
* **Password:** `password123`
* **Role:** Customer (Can browse, filter, add to cart, checkout, view orders)

### 2. Administrator Account:
* **Email:** `admin@sportzone.com`
* **Password:** `admin123`
* **Role:** Super Admin (Access to `/admin`, Product CRUD, Order fulfillment)

---

## 🌟 Key Features Implemented

1. **Athletic Dark Theme UI:** High-energy sports design with responsive layout on mobile, tablet, and desktop.
2. **Dynamic Search & Multi-Criteria Filtering:**
   - Search by brand, sport, product keyword
   - Filter by sport discipline (Cricket, Football, Badminton, Tennis, etc.)
   - Multi-brand checkboxes (MRF, SG, SS, DSC, Yonex, Adidas, Nike, Puma, etc.)
   - Price range, customer star rating, and in-stock toggle
3. **Interactive Product Details:**
   - Multiple thumbnail image previews
   - Size & color selectors
   - Real-time PIN code delivery checker
   - Technical specifications and customer reviews
4. **Shopping Cart & Checkout:**
   - Dynamic subtotal, shipping threshold calculation (Free over ₹999)
   - Coupon codes (`SPORT40`, `WINMORE`)
   - Simulated UPI QR and Card validation
5. **Order Tracking & User Profile:**
   - Multi-stage tracking (Confirmed, Shipped, Delivered)
   - Wishlist management
6. **Admin Dashboard:**
   - Revenue and inventory KPIs
   - Add/Edit/Delete products
   - Order status management
