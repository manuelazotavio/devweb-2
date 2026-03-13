import { buscarHistorico } from '../../models/exameModel.js';

const historico = async (req, res) => {
  const { de, ate, metricas } = req.query;

  const exames = await buscarHistorico(req.usuario.id, { de, ate, metricas });

  return res.json(exames);
};

export default historico;
