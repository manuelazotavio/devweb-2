import prisma from '../prismaClient.js';

const includeMetricas = {
  metricas: {
    include: { metrica: true },
  },
};

export const listarPorUsuario = (usuarioId) => {
  return prisma.exame.findMany({
    where: { usuarioId },
    include: includeMetricas,
    orderBy: { data: 'desc' },
  });
};

export const buscarPorIdEUsuario = (id, usuarioId) => {
  return prisma.exame.findFirst({
    where: { id, usuarioId },
    include: includeMetricas,
  });
};

export const criar = (data, usuarioId, exames) => {
  return prisma.exame.create({
    data: {
      data: new Date(data),
      usuarioId,
      metricas: {
        create: exames.map(({ idMetrica, valor }) => ({
          metricaId: idMetrica,
          valor,
        })),
      },
    },
    include: includeMetricas,
  });
};

export const atualizar = async (id, data, exames) => {
  const updateData = {};

  if (data) {
    updateData.data = new Date(data);
  }

  if (exames && Array.isArray(exames) && exames.length > 0) {
    await prisma.exameMetrica.deleteMany({ where: { exameId: id } });
    updateData.metricas = {
      create: exames.map(({ idMetrica, valor }) => ({
        metricaId: idMetrica,
        valor,
      })),
    };
  }

  return prisma.exame.update({
    where: { id },
    data: updateData,
    include: includeMetricas,
  });
};

export const remover = (id) => {
  return prisma.exame.delete({ where: { id } });
};

export const buscarHistorico = (usuarioId, { de, ate, metricas }) => {
  const where = { usuarioId };

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
      some: { metricaId: { in: ids } },
    };
  }

  return prisma.exame.findMany({
    where,
    include: includeMetricas,
    orderBy: { data: 'asc' },
  });
};
