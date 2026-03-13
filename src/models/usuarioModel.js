import prisma from '../prismaClient.js';

export const buscarPorEmail = (email) => {
  return prisma.usuario.findUnique({ where: { email } });
};

export const criar = (data) => {
  return prisma.usuario.create({ data });
};

export const buscarPorId = (id) => {
  return prisma.usuario.findUnique({ where: { id } });
};

export const atualizarRefreshToken = (id, refreshToken) => {
  return prisma.usuario.update({
    where: { id },
    data: { refreshToken },
  });
};
