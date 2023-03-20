--------------------------------------------------------------------------
-- Guardians:
--------------------------------------------------------------------------

-- show all guardians
SELECT * FROM Guardians

-- show all guardians joined with ranks
SELECT Guardians.guardian_id, Guardians.name, Ranks.rank_id, Ranks.title FROM Guardians INNER JOIN Guardian_rank ON Guardians.guardian_id = Guardian_rank.guardian_id INNER JOIN Ranks ON Guardian_rank.rank_id = Ranks.rank_id ORDER BY Guardians.guardian_id;

-- add new guardian
INSERT INTO Guardians (name, glimmer_balance) VALUES ('${data.name}', '${glimmer_balance}')

-- add default rank to a guardian
-- will automatically run when creating a new guardian,giving them the "new light rank"
INSERT INTO Guardian_rank(guardian_id, rank_id) VALUES ((SELECT guardian_id FROM Guardians WHERE name = '${data.name}'), 1);

-- update guardian
UPDATE Guardians SET name = ?, glimmer_balance = ? WHERE Guardians.guardian_id = ?

-- delete guardian and guardian ranks they have
DELETE FROM Guardians WHERE guardian_id = ?;
DELETE FROM Guardian_rank WHERE guardian_id = ?;


--------------------------------------------------------------------------
-- Guardian_rank:
--------------------------------------------------------------------------

-- show all Guardians and Ranks
SELECT Guardians.guardian_id, Guardians.name, Ranks.rank_id, Ranks.title FROM Guardians INNER JOIN Guardian_rank ON Guardians.guardian_id = Guardian_rank.guardian_id INNER JOIN Ranks ON Guardian_rank.rank_id = Ranks.rank_id ORDER BY Guardians.guardian_id;

-- add a new rank to a guardian
-- for existing guardians
INSERT INTO Guardian_rank (guardian_id, rank_id) VALUES('${guardian_id}', '${new_rank}')
INSERT INTO Guardian_rank(guardian_id, rank_id) VALUES ((SELECT guardian_id FROM Guardians WHERE name = '${data.name}'), '${data.rank}');


--------------------------------------------------------------------------
-- Ranks:
--------------------------------------------------------------------------

-- show all ranks and their attributes
SELECT * FROM Ranks;

-- add new rank
INSERT INTO Ranks(title) VALUES ('${r_data.title}');

-- delete ranks
DELETE FROM Guardian_rank WHERE rank_id = ?; 
DELETE FROM Ranks WHERE rank_id = ?;


--------------------------------------------------------------------------
-- Weapons:
--------------------------------------------------------------------------

-- show all weapons and their attributes
SELECT * FROM Weapons;

--add new weapon
INSERT INTO Weapons(name, type, slot, element, description, rank_req, price) 
VALUES ('${w_data.name}', '${w_data.type}', '${w_data.slot}', '${w_data.element}', '${w_data.description}', NULLIF('${w_data.rank_req}',0), '${w_data.price}');

-- delete weapon
DELETE FROM Weapons WHERE weapon_id = ?


--------------------------------------------------------------------------
-- Cosmetics:
--------------------------------------------------------------------------

-- show all cosmetics and their attributes
SELECT * FROM Cosmetics;

-- add new cosmetic
INSERT INTO Cosmetics(name, slot, description, rank_req, class, price) 
VALUES ('${cos_data.name}', '${cos_data.slot}',  '${cos_data.description}', NULLIF('${cos_data.rank_req}',0), '${cos_data.class}', '${cos_data.price}');

--delete cosmetic
DELETE FROM Cosmetics WHERE cosmetic_id = ?


--------------------------------------------------------------------------
-- Consumables:
--------------------------------------------------------------------------

-- show all consumables and their attributes
SELECT * FROM Consumables;

-- add new consumable
INSERT INTO Consumables(name, description, price) VALUES ('${con_data.name}', '${con_data.description}', '${con_data.price}');

--delete consumable
DELETE FROM Consumables WHERE consumable_id = ?


--------------------------------------------------------------------------
-- Sales:
--------------------------------------------------------------------------

-- show all sales and their attributes
SELECT Sales.sale_id, Sales.total_price, Sales.guardian_id, Guardians.name AS Guardian, Weapons.name AS Weapon, 
Cosmetics.name AS Cosmetic, Consumables.name AS Consumable FROM Sales
INNER JOIN Guardians ON Sales.guardian_id = Guardians.guardian_id
LEFT JOIN Weapons ON Sales.weapon_id = Weapons.weapon_id
LEFT JOIN Cosmetics ON Sales.cosmetic_id = Cosmetics.cosmetic_id
LEFT JOIN Consumables ON Sales.consumable_id = Consumables.consumable_id ORDER BY Sales.sale_id;

--add new sale
-- price is calculated automatically based on the dropdown selections
-- dropdowns can be NULL
INSERT INTO Sales(total_price, guardian_id, weapon_id, cosmetic_id, consumable_id) VALUES 
    (((IFNULL((SELECT price FROM Weapons WHERE weapon_id = ${s_data.weapon_id}),0)) + 
    (IFNULL((SELECT price FROM Cosmetics WHERE cosmetic_id = ${s_data.cosmetic_id}),0)) + 
    (IFNULL((SELECT price FROM Consumables WHERE consumable_id = ${s_data.consumable_id}),0))), 
    '${s_data.guardian_id}', NULLIF(${s_data.weapon_id},''), NULLIF(${s_data.cosmetic_id},''), NULLIF(${s_data.consumable_id},''));

--delete sale
DELETE FROM Sales WHERE sale_id = ?