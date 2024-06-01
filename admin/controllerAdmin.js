const db = require('../config');

exports.getAllPengaduan = (req, res) => {
    db.query('SELECT * FROM pengaduan', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.createPengaduan = (req, res) => {
    const { judul, isi } = req.body;
    db.query('INSERT INTO pengaduan (judul, isi) VALUES (?, ?)', [judul, isi], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, judul, isi });
    });
};

exports.updatePengaduan = (req, res) => {
    const { id } = req.params;
    const { respon, status } = req.body;
    db.query('UPDATE pengaduan SET respon = ?, status = ? WHERE id = ?', [respon, status, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengaduan not found' });
        }
        res.json({ message: 'Pengaduan updated' });
    });
};

exports.deletePengaduan = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pengaduan WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pengaduan not found' });
        }
        res.json({ message: 'Pengaduan deleted' });
    });
};
