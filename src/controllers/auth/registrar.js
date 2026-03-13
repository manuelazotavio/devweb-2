import bcrypt from 'bcryptjs';
import { buscarPorEmail, criar } from '../../models/usuarioModel.js';

const registrar = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const usuarioExistente = await buscarPorEmail(email);
  if (usuarioExistente) {
    return res.status(409).json({ erro: 'Email já cadastrado' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = await criar({ email, senha: senhaHash });

  return res.status(201).json({ id: usuario.id, email: usuario.email });
};

export default registrar;
