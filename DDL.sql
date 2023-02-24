-- CS340 Group 140 Project - Banshee-44's Exotic Shop
-- Max Goldstein and Torin Perkins

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Guardians;
DROP TABLE IF EXISTS Ranks;
DROP TABLE IF EXISTS Guardian_rank;
DROP TABLE IF EXISTS Weapons;
DROP TABLE IF EXISTS Cosmetics;
DROP TABLE IF EXISTS Consumables;
DROP TABLE IF EXISTS Sales;

-- weapon.type: Auto Rifle, Pulse Rifle, Hand Canon, Scout Rifle, SMG, Sidearm, Bow
-- weapon.type: Fusion Rifle, Sniper Rifle, Shotgun, Grenade Launcher, Trace Rifle, Glaive
-- weapon.type: Machine Gun, Rocket Launcher, Linear Fusion Rifle Sword

--weapon.element: Kinetic, Stasis, Arc, Solar, Void

--cosmetics.slot: Helm, Arms, Chest, Legs, Class Item

--cosmetics.class: Hunter, Titan, Warlock

--Create Guardians table
CREATE TABLE `Guardians` (
    `guardian_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `glimmer_balance` int NOT NULL,
    PRIMARY KEY (`guardian_id`)
);

--Create Ranks table
CREATE TABLE `Ranks` (
    `rank_id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    PRIMARY KEY (`rank_id`)
);

--Create Guardian_rank table to facilitate M:N relationship between Guardians and Ranks
CREATE TABLE `Guardian_rank` (
    `guardian_id` int NOT NULL,
    `rank_id` int NOT NULL,
    CONSTRAINT FOREIGN KEY (`guardian_id`) REFERENCES `Guardians` (`guardian_id`) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (`rank_id`) REFERENCES `Ranks` (`rank_id`) ON DELETE CASCADE
);

--Create Weapons table
CREATE TABLE `Weapons` (
    `weapon_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `type` varchar(255) NOT NULL,
    `slot` varchar(255) NOT NULL,
    `element` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `rank_req` int,
    `price` int NOT NULL,
    PRIMARY KEY (`weapon_id`)
);

--Create Cosmetics table
CREATE TABLE `Cosmetics` (
    `cosmetic_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `slot` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `rank_req` int,
    `class` varchar(255) NOT NULL,
    `price` int NOT NULL,
    PRIMARY KEY (`cosmetic_id`)
);

--Create Consumables table
CREATE TABLE `Consumables` (
    `consumable_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `price` int NOT NULL,
    PRIMARY KEY (`consumable_id`)
);

--Create Sales table
CREATE TABLE `Sales` (
    `sale_id` int NOT NULL AUTO_INCREMENT,
    `total_price` int NOT NULL,
    `guardian_id` int NOT NULL,
    `weapon_id` int,
    `cosmetic_id` int,
    `consumable_id` int,
    CONSTRAINT FOREIGN KEY (`guardian_id`) REFERENCES `Guardians` (`guardian_id`) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (`weapon_id`) REFERENCES `Weapons` (`weapon_id`) ON DELETE CASCADE,    
    CONSTRAINT FOREIGN KEY (`cosmetic_id`) REFERENCES `Cosmetics` (`cosmetic_id`) ON DELETE CASCADE,    
    CONSTRAINT FOREIGN KEY (`consumable_id`) REFERENCES `Consumables` (`consumable_id`) ON DELETE CASCADE,    
    PRIMARY KEY (`sale_id`)
);

-- Insert sample data into Guardians
INSERT INTO `Guardians`(`glimmer_balance`, `name`) VALUES 
(100000, 'Commander Zavala'),
(356124, 'Ikora Rey'),
(723536, 'Cayde-6');

-- Insert sample data into Ranks
INSERT INTO `Ranks`(`title`) VALUES 
('New Light'), ('Vanguard Legend'), ('Crucible God'), ('Gambit Beast'), ('Raid Boss');

-- Insert sample data into Guardian_rank intersection table
INSERT INTO `Guardian_rank`(`guardian_id`, `rank_id`) VALUES 
((SELECT `guardian_id` FROM `Guardians` WHERE `guardian_id`=1), 
(SELECT `rank_id` FROM `Ranks` WHERE `title`='Vanguard Legend')),
((SELECT `guardian_id` FROM `Guardians` WHERE `guardian_id`=2), 
(SELECT `rank_id` FROM `Ranks` WHERE `title`='Raid Boss')),
((SELECT `guardian_id` FROM `Guardians` WHERE `guardian_id`=3), 
(SELECT `rank_id` FROM `Ranks` WHERE `title`='Crucible God'));

-- Insert sample data into Weapons
INSERT INTO `Weapons`(`name`, `type`, `slot`, `element`, `description`, `rank_req`, `price`) VALUES 
('MIDA Multitool', 'Scout Rifle', 'Kinetic', 'Kinetic', 'Select application: Ballistic engagement. Entrenching tool. Avionics trawl....', 2, 7000),
('Telesto', 'Fusion Rifle', 'Elemental', 'Void', 'Vestiges of the Queens Harbingers yet linger among Saturns moons.', 3, 9000),
('Risk Runner', 'SMG', 'Elemental', "Arc", 'Charge your soul and let the electrons sing.', 1, '3000');

-- Insert sample data into Cosmetics
INSERT INTO `Cosmetics`(`name`, `slot`, `description`, `rank_req`, `class`, `price`) VALUES 
('St0mp-EE5', 'Legs', 'I call them Stompies! For when your legs need that extra kick.', 2, 'Hunter', 3000),
('Astocyte Verse', 'Helm', 'The ideocosm contain within this healm transforms the wearers head', 0, 'Warlock', 5000),
('Gwisin Vest', 'Chest', 'The Traveler called my back. Told me my work on this side isnt done yet', 1, 'Hunter', 6000);

-- Insert sample data into Consumables
INSERT INTO `Consumables`(`name`, `description`, `price`) VALUES 
('Enhancement Core', 'Use to upgrade your gear', 500), 
('Legendary Shard', 'Craft new mods', 100),
('Upgrade Module', 'Infuse your gear', 200);

-- Insert sample data into Sales
INSERT INTO `Sales`(`total_price`, `guardian_id`, `weapon_id`, `cosmetic_id`, `consumable_id`)VALUES 
((SELECT `price` FROM `Weapons` WHERE `name` = 'MIDA Multitool'), 1, (SELECT `weapon_id` FROM `Weapons` WHERE `name` = 'MIDA Multitool'), NULL, NULL),
((SELECT `price` FROM `Weapons` WHERE `name` = 'Risk Runner') + (SELECT `price` FROM `Cosmetics` WHERE `name` = 'St0mp-EE5'), 2, 
(SELECT `weapon_id` FROM `Weapons` WHERE `name` = 'Risk Runner'), (SELECT `cosmetic_id` FROM `Cosmetics` WHERE `name` = 'St0mp-EE5'), NULL),
((SELECT `price` FROM `Consumables` WHERE `name` = 'Enhancement Core'), 3, NULL, NULL, (SELECT `consumable_id` FROM `Consumables` WHERE `name` = 'Enhancement Core'));

-- Display tables for testing
SELECT * FROM `Guardians`;

SELECT * FROM `Ranks`;

SELECT * FROM `Guardian_rank`;

SELECT * FROM `Weapons`;

SELECT * FROM `Cosmetics`;

SELECT * FROM `Consumables`;

SELECT * FROM `Sales`;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;