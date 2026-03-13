import { buscarPorIdEUsuario, remover as removerExame } from '../../models/exameModel.js';

const remover = async (req, res) => {
  const { id } = req.params;

  const existente = await buscarPorIdEUsuario(Number(id), req.usuario.id);

  if (!existente) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }

  await removerExame(Number(id));
  return res.status(204).send();
};

export default remover;
