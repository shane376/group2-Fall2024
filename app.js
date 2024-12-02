const express = require('express');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL client setup
const client = new Client({
  user: process.env.DB_USER,     
  host: process.env.DB_HOST,        
  database: process.env.DB_NAME,     
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT, 
});

// Connect to PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Middleware to parse incoming JSON requests
app.use(express.static(path.join(__dirname, 'public')));

// Define routes

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test DB connection route
app.get('/test-db', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM books LIMIT 1');
    console.log(result.rows); // Log the result to the console
    res.json(result.rows); // Send the result back as a JSON response
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Error querying the database');
  }
});

// POST route to add a book
app.post('/add-book', async (req, res) => {
  const { title, genre_id, author_id, isbn } = req.body;  // Extract data from the request body
  try {
    // Query to insert the new book
    const result = await client.query(
      'INSERT INTO books (title, genre_id, author_id, isbn) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, genre_id, author_id, isbn]
    );
    res.json(result.rows[0]);  // Return the newly inserted book
  } catch (err) {
    console.error('Error inserting book:', err);
    res.status(500).send('Error inserting book');
  }
});

// PUT route to update book details
app.put('/update-book/:book_id', async (req, res) => {
  const { book_id } = req.params;  // Get book_id from URL parameters
  const { title, genre_id, author_id, isbn } = req.body;  // Get data from request body
  try {
    // Query to update the book
    const result = await client.query(
      'UPDATE books SET title = $1, genre_id = $2, author_id = $3, isbn = $4 WHERE book_id = $5 RETURNING *',
      [title, genre_id, author_id, isbn, book_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);  // Return the updated book
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).send('Error updating book');
  }
});

// DELETE route to delete a book by ID
app.delete('/delete-book/:book_id', async (req, res) => {
  const { book_id } = req.params;  // Get book_id from URL parameters
  try {
    // Query to delete the book
    const result = await client.query(
      'DELETE FROM books WHERE book_id = $1 RETURNING *',
      [book_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).send('Error deleting book');
  }
});

// GET route to get all books
app.get('/books', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Error fetching books');
  }
});

// GET route to get a specific book by ID
app.get('/book/:book_id', async (req, res) => {
  const { book_id } = req.params;
  try {
    const result = await client.query('SELECT * FROM books WHERE book_id = $1', [book_id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).send('Error fetching book');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
