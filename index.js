const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Pastikan file db.js sudah dikonfigurasi dengan benar
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Endpoint dasar
app.get('/', (req, res) => {
  res.send('Hello World from Express.js!');
});

// CREATE produk
app.post('/produk', async (req, res) => {
  const { nama, harga } = req.body;
  try {
    const newProduk = await pool.query(
      'INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *',
      [nama, harga]
    );
    res.json(newProduk.rows[0]);
  } catch (err) {
    console.error(err); // Cetak error ke console
    res.status(500).json({ error: 'Server error' });
  }
});

// READ semua produk
app.get('/produk', async (req, res) => {
  try {
    const allProduk = await pool.query('SELECT * FROM produk');
    res.json(allProduk.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});