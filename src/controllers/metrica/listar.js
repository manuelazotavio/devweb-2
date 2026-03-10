const prisma = require('../../prismaClient');

const listar = async (req, res) => {
  const metricas = await prisma.metrica.findMany();
  return res.json(metricas);
};

module.exports = listar;
