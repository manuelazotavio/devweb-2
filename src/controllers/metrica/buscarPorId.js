import { buscarPorId as buscarMetricaPorId } from '../../models/metricaModel.js';

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const metrica = await buscarMetricaPorId(Number(id));

  if (!metrica) {
    return res.status(404).json({ erro: 'Métrica não encontrada' });
  }

  return res.json(metrica);
};

export default buscarPorId;
