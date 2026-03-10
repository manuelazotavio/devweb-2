const prisma = require('../../prismaClient');

const criar = async (req, res) => {
  const { data, exames } = req.body;

  if (!data || !exames || !Array.isArray(exames) || exames.length === 0) {
    return res.status(400).json({ erro: 'Data e lista de exames são obrigatórios' });
  }

  const exame = await prisma.exame.create({
    data: {
      data: new Date(data),
      usuarioId: req.usuario.id,
      metricas: {
        create: exames.map(({ idMetrica, valor }) => ({
          metricaId: idMetrica,
          valor,
        })),
      },
    },
    include: {
      metricas: {
        include: { metrica: true },
      },
    },
  });

  return res.status(201).json(exame);
};

module.exports = criar;
