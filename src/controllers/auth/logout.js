import jwt from 'jsonwebtoken';
import { atualizarRefreshToken } from '../../models/usuarioModel.js';

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ erro: 'Refresh token não fornecido' });
  }

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).json({ erro: 'Refresh token inválido' });
  }

  await atualizarRefreshToken(payload.id, null);

  return res.json({ mensagem: 'Logout realizado com sucesso' });
};

export default logout;
