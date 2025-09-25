import React, { useState, useEffect } from 'react';
import { createUsuario, updateUsuario } from '../../services/mockApi';
import { Usuario } from '../../types/usuario.type';

interface UsuarioFormProps {
  usuario: Usuario | null;
  onClose: () => void;
  onSave: (usuario: Usuario) => void;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ usuario, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
  });

  useEffect(() => {
    if (usuario) {
      const formatarData = (dataString?: string) => {
        if (!dataString) return '';
        return dataString.split('T')[0];
      };

      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone || '',
        dataNascimento: formatarData(usuario.dataNascimento),
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
      });
    }
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dadosParaEnviar = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        telefone: formData.telefone ? formData.telefone.trim() : undefined,
        dataNascimento: formData.dataNascimento ? formData.dataNascimento : undefined,
      };

      console.log('Dados a serem enviados:', dadosParaEnviar);

      if (usuario) {
        const usuarioAtualizado = await updateUsuario(usuario.id, dadosParaEnviar);
        onSave(usuarioAtualizado);
      } else {
        const novoUsuario = await createUsuario(dadosParaEnviar);
        onSave(novoUsuario);
      }
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nome *</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Telefone</label>
          <input
            type="tel"
            className="form-control"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-light me-1">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioForm;
