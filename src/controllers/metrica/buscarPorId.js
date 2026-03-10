const prisma = require('../../prismaClient');

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const metrica = await prisma.metrica.findUnique({ where: { id: Number(id) } });

  if (!metrica) {
    return res.status(404).json({ erro: 'Métrica não encontrada' });
  }

  return res.json(metrica);
};

module.exports = buscarPorId;
