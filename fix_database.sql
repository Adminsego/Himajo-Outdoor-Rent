-- Fix database schema for Himajo Outdoor Rent Admin
-- Run this in your MySQL client (phpMyAdmin or MySQL Workbench)

USE himajo;

-- 1. Add missing 'description' column to products table
ALTER TABLE products ADD COLUMN description TEXT NULL AFTER category;

-- 2. Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Create featured_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS `featured_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NULL,
  `title` varchar(255) NOT NULL,
  `description` text NULL,
  `image_url` varchar(1024) NULL,
  `button_text` varchar(100) NULL,
  `button_link` varchar(255) NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  CONSTRAINT `fk_featured_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Create faqs table if it doesn't exist
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Insert admin user if not exists
INSERT IGNORE INTO `admin_users` (`username`, `password_hash`, `name`) 
VALUES ('admin', '$2b$10$MsYxId7zlR3wBAn3pAVM0OBw.Ic1ATMAwcho8Lq2HCDBLr2iWNpDC', 'Administrator');

-- 6. Add sample featured items
INSERT IGNORE INTO `featured_items` (`product_id`, `title`, `description`, `image_url`, `button_text`, `button_link`, `display_order`) 
VALUES 
(1, 'Tas Carrier Premium', 'Tas carrier berkualitas tinggi untuk petualangan Anda', 'https://api.builder.io/api/v1/image/assets/TEMP/a72eaa1efdd58746e27f3cbbb29ff111dc6423ab?width=394', 'Lihat Detail', '/products/consina-bering-60', 1),
(2, 'Jaket Outdoor', 'Jaket outdoor tahan air dan angin', 'https://api.builder.io/api/v1/image/assets/TEMP/8c266c0d69634880ea1849eebad7fbb3e7bc3238?width=426', 'Lihat Detail', '/products/jack-wolfskin-jacket', 2);

-- 7. Add sample FAQs
INSERT IGNORE INTO `faqs` (`question`, `answer`, `display_order`) 
VALUES 
('Bagaimana cara menyewa produk?', 'Anda dapat menyewa produk dengan mengunjungi halaman produk dan mengisi formulir pendaftaran.', 1),
('Apa saja persyaratan sewa?', 'Persyaratan sewa meliputi identitas diri yang sah dan uang jaminan.', 2),
('Berapa lama masa sewa?', 'Masa sewa minimum 1 hari dan maksimal 30 hari.', 3);

-- 8. Update products with sample descriptions
UPDATE products SET description = 'Tas carrier kapasitas 60 liter, cocok untuk pendakian dan backpacking jarak jauh.' WHERE slug = 'consina-bering-60';
UPDATE products SET description = 'Tas carrier 60 liter dengan sistem suspensi yang nyaman, ideal untuk perjalanan panjang.' WHERE slug = 'osprey-atmos-60';
UPDATE products SET description = 'Jaket outdoor dengan teknologi waterproof, melindungi dari hujan dan angin.' WHERE slug = 'jack-wolfskin-jacket';
UPDATE products SET description = 'Tenda kapasitas 2 orang, mudah dipasang dan tahan terhadap cuaca ekstrem.' WHERE slug = 'eiger-equator-tent';

-- Verify tables
SELECT 'Tables created successfully' as status;
