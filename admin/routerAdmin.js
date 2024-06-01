const express = require('express');
const router = express.Router();
const adminController = require('./controllerAdmin');

// GET all pengaduan
router.get('/pengaduan', adminController.getAllPengaduan);

// POST a new pengaduan
router.post('/pengaduan', adminController.createPengaduan);

// PUT to update a pengaduan
router.put('/pengaduan/:id', adminController.updatePengaduan);

// DELETE a pengaduan
router.delete('/pengaduan/:id', adminController.deletePengaduan);

module.exports = router;
