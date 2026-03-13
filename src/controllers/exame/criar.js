import { criar as criarExame } from '../../models/exameModel.js';

const criar = async (req, res) => {
  const { data, exames } = req.body;

  if (!data || !exames || !Array.isArray(exames) || exames.length === 0) {
    return res.status(400).json({ erro: 'Data e lista de exames são obrigatórios' });
  }

  const exame = await criarExame(data, req.usuario.id, exames);

  return res.status(201).json(exame);
};

export default criar;
