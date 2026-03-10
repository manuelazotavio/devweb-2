const express = require('express');
const authRoutes = require('./routes/authRoutes');
const metricaRoutes = require('./routes/metricaRoutes');
const exameRoutes = require('./routes/exameRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/metricas', metricaRoutes);
app.use('/exames', exameRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

module.exports = app;
