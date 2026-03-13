import jwt from 'jsonwebtoken';
import { buscarPorId, atualizarRefreshToken } from '../../models/usuarioModel.js';
import gerarTokens from '../../utils/gerarTokens.js';

const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ erro: 'Refresh token não fornecido' });
  }

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).json({ erro: 'Refresh token inválido ou expirado' });
  }

  const usuario = await buscarPorId(payload.id);
  if (!usuario || usuario.refreshToken !== refreshToken) {
    return res.status(401).json({ erro: 'Refresh token inválido' });
  }

  const tokens = gerarTokens(usuario.id);

  await atualizarRefreshToken(usuario.id, tokens.refreshToken);

  return res.json(tokens);
};

export default refresh;
