import express from 'express';
import authRoutes from './routes/authRoutes.js';
import metricaRoutes from './routes/metricaRoutes.js';
import exameRoutes from './routes/exameRoutes.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/metricas', metricaRoutes);
app.use('/exames', exameRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

export default app;
