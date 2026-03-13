import { listarTodas } from '../../models/metricaModel.js';

const listar = async (req, res) => {
  const metricas = await listarTodas();
  return res.json(metricas);
};

export default listar;
