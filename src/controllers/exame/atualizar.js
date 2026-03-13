import { buscarPorIdEUsuario, atualizar as atualizarExame } from '../../models/exameModel.js';

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { data, exames } = req.body;

  const existente = await buscarPorIdEUsuario(Number(id), req.usuario.id);

  if (!existente) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }

  const exame = await atualizarExame(Number(id), data, exames);

  return res.json(exame);
};

export default atualizar;
