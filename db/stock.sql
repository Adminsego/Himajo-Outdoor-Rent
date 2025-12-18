-- MySQL schema and sample data for Himajo stock management
-- Compatible with phpMyAdmin Import

-- 1) Create database (you can also create manually in phpMyAdmin UI)
CREATE DATABASE IF NOT EXISTS himajo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE himajo;

-- 2) Tables
DROP TABLE IF EXISTS stock_movements;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  price_idr INT UNSIGNED NOT NULL DEFAULT 0,
  image VARCHAR(1024) NULL,
  category VARCHAR(64) NULL,
  is_best_seller TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE stock (
  product_id INT UNSIGNED NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (product_id),
  CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional: track in/out movement per product
CREATE TABLE stock_movements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  change_qty INT NOT NULL,
  reason ENUM('init','rent_out','return','adjust') NOT NULL DEFAULT 'init',
  note VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_mov_product (product_id),
  CONSTRAINT fk_mov_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3) Seed products (subset from app data)
INSERT INTO products (slug, name, price_idr, image, category, is_best_seller) VALUES
('consina-bering-60','Consina Bering 60',250000,'https://api.builder.io/api/v1/image/assets/TEMP/a72eaa1efdd58746e27f3cbbb29ff111dc6423ab?width=394','Tas Carrier',0),
('osprey-atmos-60','Osprey Atmos 60',350000,'https://api.builder.io/api/v1/image/assets/TEMP/4faa88f9ccf8be540c8a111d23a77d7d8bfd0631?width=356','Tas Carrier',0),
('eiger-phalanger-35','Eiger phalanger 35',350000,'https://api.builder.io/api/v1/image/assets/TEMP/89334124bc0e159068472945f6e7df5b71249868?width=272','Tas Carrier',0),
('jack-wolfskin-jacket','Jack Wolfskin Jacket',150000,'https://api.builder.io/api/v1/image/assets/TEMP/8c266c0d69634880ea1849eebad7fbb3e7bc3238?width=426','Jaket',1),
('eiger-equator-tent','Eiger Equator Tent',250000,'https://api.builder.io/api/v1/image/assets/TEMP/d29d7817ce78b3515bb7e11e14e5e4d13a232203?width=444','Tenda',0),
('big-adventure-tambora-series','Big Adventure Tambora Series',350000,'https://api.builder.io/api/v1/image/assets/TEMP/f7f969f5ca658a573bc548986e62bd6e015aa2ff?width=478','Tenda',1),
('salomon-xt-6-gtx-triple-black','Salomon XT-6 Gore-Tex Triple Black',400000,'https://api.builder.io/api/v1/image/assets/TEMP/7e93c4a8b355a191de95a9080237a6f1053673cf?width=622','Sepatu',0),
('eiger-mamba-low','Eiger Mamba Low',155000,'https://api.builder.io/api/v1/image/assets/TEMP/33cea92eca40cff152ae6bd5cc4ab93bf1cb97d6?width=472','Sepatu',0),
('eiger-valor-trekking-pole','Eiger Valor Trekking Pole',100000,'https://api.builder.io/api/v1/image/assets/TEMP/db9655e3e495e42b3e08f040d3babab8fe5e1d13?width=440','Trekking pole',0),
('consina-cooking-set','Consina Cooking Set',100000,'https://api.builder.io/api/v1/image/assets/TEMP/2722a536f81e87e46ca8960056bec12da8d858ec?width=432','Alat Memasak',0),
('consina-kettle','Consina Kettle',50000,'https://api.builder.io/api/v1/image/assets/TEMP/ed6bc42c7fcf0418ecfcba0296d9e0438a3b0d52?width=340','Alat Memasak',0),
('eiger-inferno-stove','Eiger Inferno Stove',200000,'https://api.builder.io/api/v1/image/assets/TEMP/79daa63bec70d307867e7aa15b3512d6fbb17c65?width=398','Alat Memasak',0),
('the-north-face-strombreak-2p','The North Face Strombreak 2P',350000,'https://api.builder.io/api/v1/image/assets/TEMP/7f5f4f611fd52016a13db938ae49c709bd047b02?width=438','Tenda',0),
('jack-wolfskin-texapore-shoes','Jack Wolfskin Texapore shoes',200000,'https://api.builder.io/api/v1/image/assets/TEMP/046b364c998ce99314c3dd1da444ad1fa79cb0fb?width=438','Sepatu',0);

-- 4) Seed stock quantities (match inserted rows order using LAST_INSERT_ID is unreliable across bulk; use subquery by slug)
INSERT INTO stock (product_id, quantity) VALUES
((SELECT id FROM products WHERE slug='consina-bering-60'), 5),
((SELECT id FROM products WHERE slug='osprey-atmos-60'), 3),
((SELECT id FROM products WHERE slug='eiger-phalanger-35'), 4),
((SELECT id FROM products WHERE slug='jack-wolfskin-jacket'), 8),
((SELECT id FROM products WHERE slug='eiger-equator-tent'), 6),
((SELECT id FROM products WHERE slug='big-adventure-tambora-series'), 2),
((SELECT id FROM products WHERE slug='salomon-xt-6-gtx-triple-black'), 7),
((SELECT id FROM products WHERE slug='eiger-mamba-low'), 9),
((SELECT id FROM products WHERE slug='eiger-valor-trekking-pole'), 10),
((SELECT id FROM products WHERE slug='consina-cooking-set'), 12),
((SELECT id FROM products WHERE slug='consina-kettle'), 15),
((SELECT id FROM products WHERE slug='eiger-inferno-stove'), 6),
((SELECT id FROM products WHERE slug='the-north-face-strombreak-2p'), 4),
((SELECT id FROM products WHERE slug='jack-wolfskin-texapore-shoes'), 5);

-- 5) Example movement seed (optional)
INSERT INTO stock_movements (product_id, change_qty, reason, note)
SELECT id, quantity, 'init', 'Initial load' FROM stock s JOIN products p ON p.id = s.product_id;
