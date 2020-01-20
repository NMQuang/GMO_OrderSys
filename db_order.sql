/*
 Navicat Premium Data Transfer

 Source Server         : nodejs
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : 10.1.10.59:3306
 Source Schema         : db_order

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 01/11/2019 09:03:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu_details
-- ----------------------------
DROP TABLE IF EXISTS `menu_details`;
CREATE TABLE `menu_details`  (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `delete_flag` int(1) NULL DEFAULT NULL,
  INDEX `menu_details_ibfk_1`(`menu_id`) USING BTREE,
  INDEX `menu_details_ibfk_2`(`product_id`) USING BTREE,
  CONSTRAINT `menu_details_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `valid_from` datetime(0) NULL DEFAULT NULL,
  `valid_to` datetime(0) NULL DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items`  (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  INDEX `order_id`(`order_id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE,
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('Doing','Done') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `menu_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `orders_ibfk_1`(`user_id`) USING BTREE,
  INDEX `orders_ibfk_2`(`menu_id`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 0) NULL DEFAULT NULL,
  `delete_flag` int(1) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for summaries
-- ----------------------------
DROP TABLE IF EXISTS `summaries`;
CREATE TABLE `summaries`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `total` decimal(10, 0) NULL DEFAULT NULL,
  `created_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `menu_id`(`menu_id`) USING BTREE,
  CONSTRAINT `summaries_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_masters
-- ----------------------------
DROP TABLE IF EXISTS `user_masters`;
CREATE TABLE `user_masters`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_masters
-- ----------------------------
INSERT INTO `user_masters` VALUES (1, '1019', 'BÙI QUANG TÂN');
INSERT INTO `user_masters` VALUES (2, '1147', 'NGUYỄN THỊ THANH THẢO');
INSERT INTO `user_masters` VALUES (3, '1157', 'ĐẶNG THỤY NHÃ ÁI');
INSERT INTO `user_masters` VALUES (4, '1346', 'NGUYỄN PHƯỚC QUANG');
INSERT INTO `user_masters` VALUES (5, '1358', 'PHẠM VĨNH NGỌC');
INSERT INTO `user_masters` VALUES (6, '1573', 'NGUYỄN THANH HIỀN');
INSERT INTO `user_masters` VALUES (7, '1723', 'VƯƠNG THÁI HUỲNH');
INSERT INTO `user_masters` VALUES (8, '1796', 'PHẠM VŨ DUY NAM');
INSERT INTO `user_masters` VALUES (9, '1827', 'NGUYỄN HOÀNG HIỆP');
INSERT INTO `user_masters` VALUES (10, '1830', 'NGUYỄN SƠN HẢI ĐÔNG');
INSERT INTO `user_masters` VALUES (11, '1834', 'NGUYỄN THÁI HIỀN');
INSERT INTO `user_masters` VALUES (12, '1835', 'NGUYỄN GIẢ HOÀNG VINH');
INSERT INTO `user_masters` VALUES (13, '1849', 'NGUYỄN DUY TIẾN');
INSERT INTO `user_masters` VALUES (14, '1850', 'NGÔ THỊ HIỀN');
INSERT INTO `user_masters` VALUES (15, '1854', 'NGUYỄN QUỐC HÙNG');
INSERT INTO `user_masters` VALUES (16, '1874', 'NGUYỄN DUY');
INSERT INTO `user_masters` VALUES (17, '1895', 'NGUYỄN MAI VÂN');
INSERT INTO `user_masters` VALUES (18, '1914', 'HỒ THANH CẨM TÚ');
INSERT INTO `user_masters` VALUES (19, '1936', 'VÕ ĐẠI VŨ');
INSERT INTO `user_masters` VALUES (20, '1987', 'NGUYỄN PHƯƠNG ANH');
INSERT INTO `user_masters` VALUES (21, '2006', 'TRẦN MẠNH LINH');
INSERT INTO `user_masters` VALUES (22, '2038', 'NGUYỄN ANH KHOA');
INSERT INTO `user_masters` VALUES (23, '2040', 'TRẦN VĂN SẮT');
INSERT INTO `user_masters` VALUES (24, '2051', 'HOÀNG THẢO MY');
INSERT INTO `user_masters` VALUES (25, '2100', 'NGUYỄN PHÚC HẬU');
INSERT INTO `user_masters` VALUES (26, '2137', 'DƯ LỆ LOAN');
INSERT INTO `user_masters` VALUES (27, '2138', 'VŨ MINH QUÂN');
INSERT INTO `user_masters` VALUES (28, '2150', 'NGUYỄN VIỆT HÀ');
INSERT INTO `user_masters` VALUES (29, '2322', 'NGUYỄN THỊ THÙY TRANG');
INSERT INTO `user_masters` VALUES (30, '2344', 'TRẦN TRƯỜNG GIANG');
INSERT INTO `user_masters` VALUES (31, '2357', 'PHẠM THU HIỀN');
INSERT INTO `user_masters` VALUES (32, '2368', 'ĐỖ MINH SANG');
INSERT INTO `user_masters` VALUES (33, '2395', 'NGUYỄN MINH QUANG');
INSERT INTO `user_masters` VALUES (34, '2414', 'TRẦN THỊ THƯƠNG HUYỀN');
INSERT INTO `user_masters` VALUES (35, '2415', 'NGUYỄN THỊ DIỆU THƯƠNG');
INSERT INTO `user_masters` VALUES (36, '2417', 'HUỲNH THỊ THÚY VÂN');
INSERT INTO `user_masters` VALUES (37, '2428', 'NGUYỄN THỊ THANH TRÚC');
INSERT INTO `user_masters` VALUES (38, '2435', 'TRẦN THỊ THANH DUY');
INSERT INTO `user_masters` VALUES (39, '2452', 'ĐINH NGỌC HUYỀN');
INSERT INTO `user_masters` VALUES (40, '2462', 'MAI VĂN TỰ');
INSERT INTO `user_masters` VALUES (41, '2471', 'NGUYỄN THỊ THU THẢO');
INSERT INTO `user_masters` VALUES (42, '2485', 'DƯƠNG ANH VŨ');
INSERT INTO `user_masters` VALUES (43, '2504', 'QUẢNG KHƯƠNG DUY');
INSERT INTO `user_masters` VALUES (44, '2524', 'NGUYỄN QUỐC TRUNG');
INSERT INTO `user_masters` VALUES (45, '2529', 'NGUYỄN ĐỨC HÙNG');
INSERT INTO `user_masters` VALUES (46, '2530', 'VÕ NGUYỄN LOAN ANH');
INSERT INTO `user_masters` VALUES (47, '2532', 'TRẦN KIỀU MY');
INSERT INTO `user_masters` VALUES (48, '2533', 'VÕ THÀNH HƯNG');
INSERT INTO `user_masters` VALUES (49, '2560', 'NGUYỄN THỊ TUYẾT NGỌC');
INSERT INTO `user_masters` VALUES (50, '2561', 'DƯƠNG THỊ MỸ NHÂN');
INSERT INTO `user_masters` VALUES (51, '2565', 'NGUYỄN THỊ KIM NGÂN');
INSERT INTO `user_masters` VALUES (52, '2587', 'LÊ TRUNG ĐÔ');
INSERT INTO `user_masters` VALUES (53, '2623', 'LÂM CÔNG ĐỈNH');
INSERT INTO `user_masters` VALUES (54, '2624', 'ĐẶNG PHƯƠNG NAM');
INSERT INTO `user_masters` VALUES (55, '2626', 'NGÔ QUỐC ANH');
INSERT INTO `user_masters` VALUES (56, '2630', 'BÙI QUANG THI');
INSERT INTO `user_masters` VALUES (57, '2644', 'PHAN VĂN HÙNG');
INSERT INTO `user_masters` VALUES (58, '2655', 'BÙI HỮU THÔNG');
INSERT INTO `user_masters` VALUES (59, '2656', 'ĐẶNG THỊ MỸ TIÊN');
INSERT INTO `user_masters` VALUES (60, '2675', 'NGUYỄN QUANG BÌNH');
INSERT INTO `user_masters` VALUES (61, '2677', 'VÕ THIÊN CHƯƠNG');
INSERT INTO `user_masters` VALUES (62, '2679', 'PHẠM NGỌC MINH');
INSERT INTO `user_masters` VALUES (63, '2680', 'NGUYỄN HUỲNH ANH HUY');
INSERT INTO `user_masters` VALUES (64, '2724', 'ĐÀM QUANG MINH');
INSERT INTO `user_masters` VALUES (65, '2726', 'NGUYỄN NGỌC QUÍ');
INSERT INTO `user_masters` VALUES (66, '2727', 'TRẦN TẤN HƯNG');
INSERT INTO `user_masters` VALUES (67, '2734', 'NGUYỄN PHÚ AN');
INSERT INTO `user_masters` VALUES (68, '2750', 'PHẠM HÀ ANH TUẤN');
INSERT INTO `user_masters` VALUES (69, '2763', 'HỨA MINH THÀNH');
INSERT INTO `user_masters` VALUES (70, '2768', 'TRỊNH HOÀNG HIỆP');
INSERT INTO `user_masters` VALUES (71, '2769', 'TRẦN NGỌC HỒNG HÀ');
INSERT INTO `user_masters` VALUES (72, '2807', 'HOÀNG MINH PHƯƠNG');
INSERT INTO `user_masters` VALUES (73, '2812', 'LÊ HOÀNG BẢO NGỌC');
INSERT INTO `user_masters` VALUES (74, '2815', 'NGUYỄN TIẾN ĐẠT');
INSERT INTO `user_masters` VALUES (75, '2828', 'HUỲNH QUỐC KHÁNH');
INSERT INTO `user_masters` VALUES (76, '2846', 'NGỌC VĂN TRƯỜNG');
INSERT INTO `user_masters` VALUES (77, '2847', 'TRẦN THỊ THÙY NGÂN');
INSERT INTO `user_masters` VALUES (78, '2850', 'NGUYỄN VÕ HUY ĐẠT');
INSERT INTO `user_masters` VALUES (79, '2874', 'NGÔ TIẾN ĐẠT');
INSERT INTO `user_masters` VALUES (80, '2875', 'NGUYỄN NHẬT KHÁNH TRÂN');
INSERT INTO `user_masters` VALUES (81, '2878', 'THÁI QUANG KHÁNH');
INSERT INTO `user_masters` VALUES (82, '2887', 'NGUYỄN THÀNH NAM');
INSERT INTO `user_masters` VALUES (83, '2888', 'TẠ HOÀNG NHẬT');
INSERT INTO `user_masters` VALUES (84, '2894', 'NGUYỄN HẢI HÀ');
INSERT INTO `user_masters` VALUES (85, '2917', 'MAI LÂM TẤN ĐẠT');
INSERT INTO `user_masters` VALUES (86, '2923', 'LÝ THIÊN HƯNG');
INSERT INTO `user_masters` VALUES (87, '2931', 'DƯƠNG THỊ THÚY NGA');
INSERT INTO `user_masters` VALUES (88, '2937', 'PHẠM VIỆT TÂN');
INSERT INTO `user_masters` VALUES (89, '2977', 'VƯƠNG ĐÌNH HOÀNG MINH');
INSERT INTO `user_masters` VALUES (90, '2979', 'HỒNG TUẤN QUYỀN');
INSERT INTO `user_masters` VALUES (91, '2980', 'CAO TRUNG NGHĨA');
INSERT INTO `user_masters` VALUES (92, '2987', 'NGUYỄN ĐỨC ANH');
INSERT INTO `user_masters` VALUES (93, '2991', 'NGUYỄN QUỐC VINH');
INSERT INTO `user_masters` VALUES (94, '3000', 'KHƯƠNG VIỆT ANH');
INSERT INTO `user_masters` VALUES (95, '3001', 'NGUYỄN ANH TUẤN');
INSERT INTO `user_masters` VALUES (96, '3022', 'PHẠM QUANG THÀNH');
INSERT INTO `user_masters` VALUES (97, '3024', 'NGUYỄN THANH QUANG');
INSERT INTO `user_masters` VALUES (98, '3025', 'TRẦN LÊ VĂN ĐỨC');
INSERT INTO `user_masters` VALUES (99, '3027', 'THẠCH MINH TÂM');
INSERT INTO `user_masters` VALUES (100, '3028', 'NHAN MINH HIẾU');
INSERT INTO `user_masters` VALUES (101, '3034', 'NGUYỄN HOÀNG MINH');
INSERT INTO `user_masters` VALUES (102, '3041', 'NGUYỄN THỊ TƯỜNG VY');
INSERT INTO `user_masters` VALUES (103, '3046', 'ĐÀO THỊ THANH VÂN');
INSERT INTO `user_masters` VALUES (104, '3048', 'VÕ TẤN HIẾU');
INSERT INTO `user_masters` VALUES (105, '3055', 'BÙI NHẬT LINH');
INSERT INTO `user_masters` VALUES (106, '3056', 'PHẠM MINH TÀI');
INSERT INTO `user_masters` VALUES (107, '3061', 'NGÔ THẾ HIỂN');
INSERT INTO `user_masters` VALUES (108, '3069', 'NGUYỄN HOÀNG NGỌC HÂN');
INSERT INTO `user_masters` VALUES (109, '3070', 'TRƯƠNG QUỐC CƯỜNG');
INSERT INTO `user_masters` VALUES (110, '3089', 'LIÊU HUY PHƯƠNG');
INSERT INTO `user_masters` VALUES (111, '3091', 'HUỲNH THỊ HỒNG PHÚC');
INSERT INTO `user_masters` VALUES (112, '3092', 'NGUYỄN NGỌC THÙY TRANG');
INSERT INTO `user_masters` VALUES (113, '3094', 'CAO THANH THUẬN');
INSERT INTO `user_masters` VALUES (114, '3095', 'VŨ TIẾN ĐỊNH');
INSERT INTO `user_masters` VALUES (115, '3096', 'TRÌNH VĂN ĐỒNG');
INSERT INTO `user_masters` VALUES (116, '3097', 'TRƯƠNG HỮU TÀI');
INSERT INTO `user_masters` VALUES (117, '3113', 'LÊ HOÀNG LONG');
INSERT INTO `user_masters` VALUES (118, '3114', 'NGUYỄN THỊ DIỄM TRANG');
INSERT INTO `user_masters` VALUES (119, '3115', 'LA YẾN NHI');
INSERT INTO `user_masters` VALUES (120, '3131', 'NGUYỄN MINH TIẾN');
INSERT INTO `user_masters` VALUES (121, '3132', 'NGUYỄN TẤN HOÀNG');
INSERT INTO `user_masters` VALUES (122, '3137', 'NGUYỄN THỊ BÍCH HÀN');
INSERT INTO `user_masters` VALUES (123, '3138', 'LƯU THANH THANH');
INSERT INTO `user_masters` VALUES (124, '3139', 'HỒ PHI HẢI');
INSERT INTO `user_masters` VALUES (125, '3140', 'LÊ THỊ TƯỜNG VY');
INSERT INTO `user_masters` VALUES (126, '3141', 'ĐỖ THỊ MỘNG NGỌC');
INSERT INTO `user_masters` VALUES (127, '3142', 'TRẦN THỊ MỸ HẠNH');
INSERT INTO `user_masters` VALUES (128, '3143', 'TRẦN THỊ NHẬT AN');
INSERT INTO `user_masters` VALUES (129, '3144', 'NGUYỄN THỊ PHƯƠNG DUNG');
INSERT INTO `user_masters` VALUES (130, '3145', 'VŨ LAN VI');
INSERT INTO `user_masters` VALUES (131, '3163', 'NGUYỄN BẢO DƯƠNG');
INSERT INTO `user_masters` VALUES (132, '3164', 'TRẦN XUÂN HƯNG');
INSERT INTO `user_masters` VALUES (133, '3165', 'NGUYỄN THỊ THANH');
INSERT INTO `user_masters` VALUES (134, '3183', 'NGUYỄN THỊ ĐỒNG');
INSERT INTO `user_masters` VALUES (135, '3191', 'NGUYỄN THỊ THANH HẠ');
INSERT INTO `user_masters` VALUES (136, '3198', 'PHẠM NHƯ HUY HÙNG');
INSERT INTO `user_masters` VALUES (137, '3199', 'TRỊNH THỊ KIM OANH');
INSERT INTO `user_masters` VALUES (138, '3201', 'LÂM TRỌNG NGHĨA');
INSERT INTO `user_masters` VALUES (139, '3205', 'VŨ THỊ NGỌC TRÂM');
INSERT INTO `user_masters` VALUES (140, '3234', 'TRẦN LÊ MỸ LINH');
INSERT INTO `user_masters` VALUES (141, '3235', 'TRẦN LÊ XUÂN');
INSERT INTO `user_masters` VALUES (142, '3255', 'HUỲNH THỊ XUÂN HƯƠNG');
INSERT INTO `user_masters` VALUES (143, '3256', 'TRẦN THỊ THÚY DUY');
INSERT INTO `user_masters` VALUES (144, '3257', 'BÙI THÀNH ĐẠT');
INSERT INTO `user_masters` VALUES (145, '3264', 'KIỀU VĂN PHƯỚC');
INSERT INTO `user_masters` VALUES (146, '3269', 'VŨ NGÔ MINH TUYỀN');
INSERT INTO `user_masters` VALUES (147, '3276', 'CAO MINH PHƯỢNG');
INSERT INTO `user_masters` VALUES (148, '3292', 'VŨ HUY CHUNG');
INSERT INTO `user_masters` VALUES (149, '3298', 'PHẠM NGỌC LAN');
INSERT INTO `user_masters` VALUES (150, '3306', 'CAO MẠNH CƯỜNG');
INSERT INTO `user_masters` VALUES (151, '3310', 'TRANG CÔNG PHÚC');
INSERT INTO `user_masters` VALUES (152, '3314', 'NGUYỄN THỊ HẰNG');
INSERT INTO `user_masters` VALUES (153, '3318', 'LA THÀNH ĐẠT');
INSERT INTO `user_masters` VALUES (154, '3322', 'DƯƠNG TẤN THANH');
INSERT INTO `user_masters` VALUES (155, '3323', 'PHAN TƯỜNG DUY');
INSERT INTO `user_masters` VALUES (156, '3324', 'NGUYỄN VĂN TUYẾN');
INSERT INTO `user_masters` VALUES (157, '3328', 'NGUYỄN HOÀNG DUY');
INSERT INTO `user_masters` VALUES (158, '3332', 'TRẦN LÂM NHẬT THIÊN');
INSERT INTO `user_masters` VALUES (159, '3335', 'VŨ THỊ THU HIỀN');
INSERT INTO `user_masters` VALUES (160, '3336', 'HOÀNG HỮU THÔNG');
INSERT INTO `user_masters` VALUES (161, '3339', 'KANAME SASAKI');
INSERT INTO `user_masters` VALUES (162, '3340', 'EGUCHI TAKUZO');
INSERT INTO `user_masters` VALUES (163, '3366', 'NGUYỄN HUY ĐỨC VĂN');
INSERT INTO `user_masters` VALUES (164, '3372', 'HUỲNH LÂM DUY');
INSERT INTO `user_masters` VALUES (165, '3374', 'NGUYỄN TUẤN TÚ');
INSERT INTO `user_masters` VALUES (166, '3378', 'TRƯƠNG TRẦN VỸ');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` enum('User','Admin') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
