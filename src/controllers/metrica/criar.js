import { criar as criarMetrica } from '../../models/metricaModel.js';

const criar = async (req, res) => {
  const { nome, unidade } = req.body;

  if (!nome || !unidade) {
    return res.status(400).json({ erro: 'Nome e unidade são obrigatórios' });
  }

  const metrica = await criarMetrica({ nome, unidade });
  return res.status(201).json(metrica);
};

export default criar;
