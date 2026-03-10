const prisma = require('../../prismaClient');

const listar = async (req, res) => {
  const exames = await prisma.exame.findMany({
    where: { usuarioId: req.usuario.id },
    include: {
      metricas: {
        include: { metrica: true },
      },
    },
    orderBy: { data: 'desc' },
  });
  return res.json(exames);
};

module.exports = listar;
