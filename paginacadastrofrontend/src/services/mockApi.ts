import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log('Detalhes do erro:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    }
    return Promise.reject(error);
  }
);

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  dataCadastro?: string;
}

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get<Usuario[]>('/usuarios');
  return response.data;
};

export const createUsuario = async (
  usuario: Omit<Usuario, 'id' | 'dataCadastro'>
): Promise<Usuario> => {
  const response = await api.post<Usuario>('/usuarios', usuario);
  return response.data;
};

export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
  const dadosLimpos: Partial<Usuario> = {};

  if (usuario.nome !== undefined) dadosLimpos.nome = usuario.nome.trim();
  if (usuario.email !== undefined) dadosLimpos.email = usuario.email.trim();

  if (usuario.telefone !== undefined && usuario.telefone !== '') {
    dadosLimpos.telefone = usuario.telefone.replace(/[()\s-]/g, '');
  }

  if (usuario.dataNascimento !== undefined && usuario.dataNascimento !== '') {
    const data = new Date(usuario.dataNascimento);
    if (!isNaN(data.getTime())) {
      const offset = data.getTimezoneOffset();
      const dataAjustada = new Date(data.getTime() - offset * 60 * 1000);
      dadosLimpos.dataNascimento = dataAjustada.toISOString().split('T')[0];
    }
  }

  console.log('Dados limpos a serem enviados:', dadosLimpos);

  const response = await api.put<Usuario>(`/usuarios/${id}`, dadosLimpos);
  return response.data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};
