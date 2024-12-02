const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
const port = 3000;

// Set up body parser to handle form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to PostgreSQL database
const client = new Client({
    user: process.env.DB_USER,     
    host: process.env.DB_HOST,        
    database: process.env.DB_NAME,     
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT, 
  });

client.connect();

// Set up the route for serving the member registration form
app.get('/members', (req, res) => {
  res.sendFile(__dirname + '/index.html');  // your HTML form file
});

// Set up the POST route to handle form submission
app.post('/register', (req, res) => {
  const { member_name, member_email, password, plan } = req.body;

  // Insert the new member into the database
  const query = `
    INSERT INTO Member (Full_Name, Email, Date_Joined, Membership_Status) 
    VALUES ($1, $2, CURRENT_DATE, $3) RETURNING Member_ID
  `;
  const values = [member_name, member_email, plan === '1' ? 'Basic Plan' : 'Premium Plan'];

  client.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error registering member');
    }
    const memberId = result.rows[0].Member_ID;
    res.send(`Member registered successfully with ID: ${memberId}`);
  });
});

// Set up the route to get the list of members
app.get('/members-list', (req, res) => {
  client.query('SELECT * FROM Member', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching members');
    }
    res.json(result.rows);
  });
});

// Checkout route to handle form submission
app.post('/checkout', (req, res) => {
    const { name, memberid } = req.body;
    
    // Get cart from the localStorage or session (for now we simulate it)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Loop through the cart and insert each item into the Loans table
    cart.forEach(book => {
        const query = `
            INSERT INTO Loans (MemberID, BookID, Loan_Status) 
            VALUES ($1, $2, 'Checked Out')`;
        const values = [memberid, book.BookID];
        
        client.query(query, values, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error processing the checkout');
            }
        });
    });
    
    // Send a success response
    res.send('Checkout completed successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
