const prisma = require('../../prismaClient');

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, unidade } = req.body;

  const existente = await prisma.metrica.findUnique({ where: { id: Number(id) } });
  if (!existente) {
    return res.status(404).json({ erro: 'Métrica não encontrada' });
  }

  const metrica = await prisma.metrica.update({
    where: { id: Number(id) },
    data: { nome, unidade },
  });

  return res.json(metrica);
};

module.exports = atualizar;
