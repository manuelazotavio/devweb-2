import { buscarPorIdEUsuario } from '../../models/exameModel.js';

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const exame = await buscarPorIdEUsuario(Number(id), req.usuario.id);

  if (!exame) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }

  return res.json(exame);
};

export default buscarPorId;
