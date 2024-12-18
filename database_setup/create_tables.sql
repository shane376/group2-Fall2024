CREATE TABLE Member (
    Member_ID SERIAL PRIMARY KEY,
    Full_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50),
    Date_Joined DATE NOT NULL,
    Membership_Status VARCHAR(20) NOT NULL
);

CREATE TABLE Genre (
    GenreID SERIAL PRIMARY KEY,
    Genre_Name VARCHAR(50) NOT NULL
);

CREATE TABLE Books (
    BookID SERIAL PRIMARY KEY,
    AuthorID INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Copies INT NOT NULL,
    GenreID INT NOT NULL,
    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID) ON DELETE CASCADE,
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID) ON DELETE CASCADE
);


CREATE TABLE Author (
    AuthorID SERIAL PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL
);

CREATE TABLE Loans (
    LoanID SERIAL PRIMARY KEY,
    MemberID INT NOT NULL,
    BookID INT NOT NULL,
    Loan_Status VARCHAR(20) NOT NULL,
    FOREIGN KEY (MemberID) REFERENCES Customer(Member_ID) ON DELETE CASCADE,
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE
);

CREATE TABLE Staff (
    StaffID SERIAL PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    Phone VARCHAR(15),
    Date_Employed DATE NOT NULL,
    Salary DECIMAL(10, 2) NOT NULL
);
