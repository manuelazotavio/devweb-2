const prisma = require('../../prismaClient');

const remover = async (req, res) => {
  const { id } = req.params;

  const existente = await prisma.metrica.findUnique({ where: { id: Number(id) } });
  if (!existente) {
    return res.status(404).json({ erro: 'Métrica não encontrada' });
  }

  await prisma.metrica.delete({ where: { id: Number(id) } });
  return res.status(204).send();
};

module.exports = remover;
