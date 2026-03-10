const prisma = require('../../prismaClient');

const historico = async (req, res) => {
  const { de, ate, metricas } = req.query;

  const where = { usuarioId: req.usuario.id };

  if (de || ate) {
    where.data = {};
    if (de) where.data.gte = new Date(de);
    if (ate) {
      const dataFim = new Date(ate);
      dataFim.setHours(23, 59, 59, 999);
      where.data.lte = dataFim;
    }
  }

  if (metricas) {
    const ids = metricas.split(',').map(Number);
    where.metricas = {
      some: {
        metricaId: { in: ids },
      },
    };
  }

  const exames = await prisma.exame.findMany({
    where,
    include: {
      metricas: {
        include: { metrica: true },
      },
    },
    orderBy: { data: 'asc' },
  });

  return res.json(exames);
};

module.exports = historico;
