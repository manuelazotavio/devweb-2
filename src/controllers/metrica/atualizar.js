import { buscarPorId, atualizar as atualizarMetrica } from '../../models/metricaModel.js';

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, unidade } = req.body;

  const existente = await buscarPorId(Number(id));
  if (!existente) {
    return res.status(404).json({ erro: 'Métrica não encontrada' });
  }

  const metrica = await atualizarMetrica(Number(id), { nome, unidade });

  return res.json(metrica);
};

export default atualizar;
