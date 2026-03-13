import { buscarPorId, remover as removerMetrica } from '../../models/metricaModel.js';

const remover = async (req, res) => {
  const { id } = req.params;

  const existente = await buscarPorId(Number(id));
  if (!existente) {
    return res.status(404).json({ erro: 'Métrica não encontrada' });
  }

  await removerMetrica(Number(id));
  return res.status(204).send();
};

export default remover;
