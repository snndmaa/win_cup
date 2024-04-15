const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'test'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define a route to fetch user data
app.get('/api/users', (req, res) => {
  // Query to select all users from the "users" table
  const query = 'SELECT * FROM users';

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the fetched user data as JSON response
    res.json(results);
    console.log(results);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
