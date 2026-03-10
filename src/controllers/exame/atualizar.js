const prisma = require('../../prismaClient');

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { data, exames } = req.body;

  const existente = await prisma.exame.findFirst({
    where: { id: Number(id), usuarioId: req.usuario.id },
  });

  if (!existente) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }

  const updateData = {};

  if (data) {
    updateData.data = new Date(data);
  }

  if (exames && Array.isArray(exames) && exames.length > 0) {
    await prisma.exameMetrica.deleteMany({ where: { exameId: Number(id) } });
    updateData.metricas = {
      create: exames.map(({ idMetrica, valor }) => ({
        metricaId: idMetrica,
        valor,
      })),
    };
  }

  const exame = await prisma.exame.update({
    where: { id: Number(id) },
    data: updateData,
    include: {
      metricas: {
        include: { metrica: true },
      },
    },
  });

  return res.json(exame);
};

module.exports = atualizar;
