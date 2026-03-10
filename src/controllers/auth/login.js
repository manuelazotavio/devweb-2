const bcrypt = require('bcryptjs');
const prisma = require('../../prismaClient');
const gerarTokens = require('../../utils/gerarTokens');

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const { accessToken, refreshToken } = gerarTokens(usuario.id);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { refreshToken },
  });

  return res.json({ accessToken, refreshToken });
};

module.exports = login;
