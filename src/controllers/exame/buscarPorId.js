const prisma = require('../../prismaClient');

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const exame = await prisma.exame.findFirst({
    where: { id: Number(id), usuarioId: req.usuario.id },
    include: {
      metricas: {
        include: { metrica: true },
      },
    },
  });

  if (!exame) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }

  return res.json(exame);
};

module.exports = buscarPorId;
