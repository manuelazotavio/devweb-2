import jwt from 'jsonwebtoken';

const gerarTokens = (usuarioId) => {
  const accessToken = jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  const refreshToken = jwt.sign({ id: usuarioId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
  return { accessToken, refreshToken };
};

export default gerarTokens;
