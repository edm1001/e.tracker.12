-- this has pre packaged information to add on for the database
INSERT INTO department ('name')
VALUES
('Managers')
('Team Leaders')
('Grocery')
('Electronics')
('Clothing and Accesories')
INSERT INTO role (title, salary, department_id)
VALUES 
-- add positions, salary, and id!
('Store Manager', '120000', 1 )
('Regionial Manager', '160000', 1)
('Grocery Leader', '60000', 2)
('Electronics Lrader', '70000', 2)
('Clothing Leader', '55000', 2)
('Dairy', '40000', 3)
('Chips and Candy', '40000', 3)
('Apple Products', '50000', 4)
('Samsung Products', '50000', 4)
('Shoes', '35000', 5)
('Clothes', '36000', 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Edmer','Valencia', 2 ,NULL)
('John', 'Doe', 1, 1 )
('Taylor', 'Locke', 3, 2)
('Eddie', 'Lou', 4, 1)
('Pete', 'Greene', 5, 3)
('Scott', 'Blue', 6, 3 )
