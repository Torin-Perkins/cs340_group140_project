-- Guardians:

-- show all guardians and their attributes
SELECT * FROM Guardians;

-- add new guardian
INSERT INTO `Guardians`(`glimmer_balance`, `name`) VALUES 
(':glimmer_input', ':name_input');

-- update guardian
UPDATE `Guardians` SET`glimmer_balance` = ':glimmer_input', `name` = 'new_name_input' WHERE `guardian_id` = ':id_dropdown_select';

-- delete guardian
DELETE FROM `Guardians` WHERE `guardian_id` = ':id_dropdown_select'; 

-- Guardian_rank

-- add a new rank to a guardian
INSERT INTO `Guardian_rank`(`guardian_id`, `rank_id`) VALUES 
((SELECT `guardian_id` FROM `Guardians` WHERE `guardian_id` = ':id_dropdown_select'), 
(SELECT `rank_id` FROM `Ranks` WHERE `title` = ':title_dropdown_select'));

-- Ranks:

-- show all ranks and their attributes
SELECT * FROM Ranks;

-- add new rank
INSERT INTO `Ranks`(`title`) VALUES 
(':title_input');


-- Weapons:

-- show all weapons and their attributes
SELECT * FROM Weapons;

--add new weapon
INSERT INTO `Weapons`(`name`, `type`, `slot`, `element`, `description`, `rank_req`, `price`) VALUES 
(':name_input', ':type_input', ':slot_input', ':element_input', ':description_input', ':rank_req_input', ':price_input');


-- Cosmetics:

-- show all cosmetics and their attributes
SELECT * FROM Cosmetics;

-- add new cosmetic
INSERT INTO `Cosmetics`(`name`, `slot`, `description`, `rank_req`, `class`, `price`) VALUES 
(':name_input', ':slot_input', ':description_input', ':rank_req_input', ':class_input', ':price_input');


-- Consumables:

-- show all consumables and their attributes
SELECT * FROM Consumables;

-- add new consumable
INSERT INTO `Consumables`(`name`, `description`, `price`) VALUES 
(':name_input', ':description_input', ':price_input');


-- Sales:

-- show all sales and their attributes
SELECT * FROM Sales;

--add new sale
-- price is calculated automatically based on the dropdown selections, if the selected guardian cannot afford it an error will be displayed
-- dropdowns can be NULL
INSERT INTO `Sales`(`total_price`, `guardian_id`, `weapon_id`, `cosmetic_id`, `consumable_id`) VALUES 
(':price_calculated_from_items', 
(SELECT `weapon_id` FROM `Weapons` WHERE `name` = ':weapon_dropdown_select'), 
(SELECT `cosmetic_id` FROM `Cosmetics` WHERE `name` = ':cosmetic_dropdown_select'), 
(SELECT `consumable_id` FROM `Consumables` WHERE `name` = ':consumable_dropdown_select'));

