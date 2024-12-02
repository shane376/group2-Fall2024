INSERT INTO Author (First_Name, Last_Name) VALUES 
('J.K.', 'Rowling'),
('Suzanne', 'Collins'),
('George', 'Orwell'),
('Harper', 'Lee'),
('F. Scott', 'Fitzgerald'),
('Joseph', 'Heller'),
('Stephen', 'King'),
('Aldous', 'Huxley'),
('Paulo', 'Coelho'),
('Oscar', 'Wilde');

INSERT INTO Genre (Genre_Name) VALUES 
('Fantasy'),
('Dystopian'),
('Classics'),
('Horror'),
('Philosophical Fiction');

INSERT INTO Books (AuthorID, Title, Copies, GenreID) VALUES 
(1, 'Harry Potter and the Sorcerer''s Stone', FLOOR(RANDOM() * 50) + 1, 1), -- J.K. Rowling, Fantasy
(2, 'The Hunger Games', FLOOR(RANDOM() * 50) + 1, 2),                     -- Suzanne Collins, Dystopian
(3, '1984', FLOOR(RANDOM() * 50) + 1, 2),                                -- George Orwell, Dystopian
(4, 'To Kill a Mockingbird', FLOOR(RANDOM() * 50) + 1, 3),               -- Harper Lee, Classics
(5, 'The Great Gatsby', FLOOR(RANDOM() * 50) + 1, 3),                    -- F. Scott Fitzgerald, Classics
(6, 'Catch-22', FLOOR(RANDOM() * 50) + 1, 3),                            -- Joseph Heller, Classics
(7, 'The Shining', FLOOR(RANDOM() * 50) + 1, 4),                         -- Stephen King, Horror
(8, 'Brave New World', FLOOR(RANDOM() * 50) + 1, 2),                     -- Aldous Huxley, Dystopian
(9, 'The Alchemist', FLOOR(RANDOM() * 50) + 1, 5),                       -- Paulo Coelho, Philosophical Fiction
(10, 'The Picture of Dorian Gray', FLOOR(RANDOM() * 50) + 1, 3);         -- Oscar Wilde, Classics

INSERT INTO Staff (First_Name, Last_Name, Role, Phone, Date_Employed, Salary) VALUES
('Emily', 'Smith', 'Librarian', '555-123-4567', '2020-05-15', 45000.00),
('James', 'Johnson', 'Assistant Librarian', '555-234-5678', '2021-09-10', 35000.00),
('Sophia', 'Williams', 'Archivist', '555-345-6789', '2019-03-25', 42000.00),
('Michael', 'Brown', 'Cataloguer', '555-456-7890', '2022-01-12', 40000.00),
('Olivia', 'Jones', 'Acquisitions Specialist', '555-567-8901', '2023-07-20', 38000.00);
