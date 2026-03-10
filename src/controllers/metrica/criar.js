const prisma = require('../../prismaClient');

const criar = async (req, res) => {
  const { nome, unidade } = req.body;

  if (!nome || !unidade) {
    return res.status(400).json({ erro: 'Nome e unidade são obrigatórios' });
  }

  const metrica = await prisma.metrica.create({ data: { nome, unidade } });
  return res.status(201).json(metrica);
};

module.exports = criar;
