import prisma from '../prismaClient.js';

export const listarTodas = () => {
  return prisma.metrica.findMany();
};

export const buscarPorId = (id) => {
  return prisma.metrica.findUnique({ where: { id } });
};

export const criar = (data) => {
  return prisma.metrica.create({ data });
};

export const atualizar = (id, data) => {
  return prisma.metrica.update({ where: { id }, data });
};

export const remover = (id) => {
  return prisma.metrica.delete({ where: { id } });
};
