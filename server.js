const express = require('express');
const cors = require('cors');
const db = require('./db');  // importing the db.js file
const speciesRoutes = require('./routes/speciesRoutes');
app.use('/api/species', speciesRoutes);

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// Example route: Add new species
app.post('/api/species', async (req, res) => {
  const { name, scientificName, location, status } = req.body;
  
  try {
    const [result] = await db.execute(
      'INSERT INTO species (name, scientificName, location, status) VALUES (?, ?, ?, ?)',
      [name, scientificName, location, status]
    );
    res.json({ message: 'Species added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding species:', err);
    res.status(500).json({ error: 'Failed to add species' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
