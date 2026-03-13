import bcrypt from 'bcryptjs';
import { buscarPorEmail, atualizarRefreshToken } from '../../models/usuarioModel.js';
import gerarTokens from '../../utils/gerarTokens.js';

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const usuario = await buscarPorEmail(email);
  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const { accessToken, refreshToken } = gerarTokens(usuario.id);

  await atualizarRefreshToken(usuario.id, refreshToken);

  return res.json({ accessToken, refreshToken });
};

export default login;
