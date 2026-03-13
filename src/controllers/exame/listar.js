import { listarPorUsuario } from '../../models/exameModel.js';

const listar = async (req, res) => {
  const exames = await listarPorUsuario(req.usuario.id);
  return res.json(exames);
};

export default listar;
