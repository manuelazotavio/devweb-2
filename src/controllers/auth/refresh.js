const jwt = require('jsonwebtoken');
const prisma = require('../../prismaClient');
const gerarTokens = require('../../utils/gerarTokens');

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

  const usuario = await prisma.usuario.findUnique({ where: { id: payload.id } });
  if (!usuario || usuario.refreshToken !== refreshToken) {
    return res.status(401).json({ erro: 'Refresh token inválido' });
  }

  const tokens = gerarTokens(usuario.id);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return res.json(tokens);
};

module.exports = refresh;
