const express = require('express');
const app = express();
const bp = require('body-parser');
const mongoose = require('mongoose');
const cariRoutes = require('./API/routes/cari');

app.use(bp.json());
mongoose.connect('mongodb://localhost/cari', { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/cari', cariRoutes);

module.exports = app;