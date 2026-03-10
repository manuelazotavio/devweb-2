const bcrypt = require('bcryptjs');
const prisma = require('../../prismaClient');

const registrar = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
  if (usuarioExistente) {
    return res.status(409).json({ erro: 'Email já cadastrado' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = await prisma.usuario.create({
    data: { email, senha: senhaHash },
  });

  return res.status(201).json({ id: usuario.id, email: usuario.email });
};

module.exports = registrar;
