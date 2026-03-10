const prisma = require('../../prismaClient');

const remover = async (req, res) => {
  const { id } = req.params;

  const existente = await prisma.exame.findFirst({
    where: { id: Number(id), usuarioId: req.usuario.id },
  });

  if (!existente) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }

  await prisma.exame.delete({ where: { id: Number(id) } });
  return res.status(204).send();
};

module.exports = remover;
