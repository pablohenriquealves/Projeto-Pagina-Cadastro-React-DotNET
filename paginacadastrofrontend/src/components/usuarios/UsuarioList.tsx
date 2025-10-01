import React, { useState, useEffect } from 'react';
import { getUsuarios, deleteUsuario } from '../../services/mockApi';
import UsuarioForm from './UsuarioForm';
import UsuarioItem from './UsuarioItem';
import { Usuario } from '../../types/usuario.type';
import './UsuarioList.css';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUsuario(id);
        carregarUsuarios();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  const handleEditar = (usuario: Usuario) => {
    setEditando(usuario);
    setShowForm(true);
  };

  return (
    <div className="background-purple">
      <h2 className="textcolor-white ms-1">Usuários Cadastrados</h2>
      <button
        className="btn btn-light ms-1"
        onClick={() => {
          setEditando(null);
          setShowForm(true);
        }}
      >
        Adicionar Usuário
      </button>

      {showForm && (
        <UsuarioForm
          usuario={editando}
          onClose={() => setShowForm(false)}
          onSave={() => {
            setShowForm(false);
            carregarUsuarios();
          }}
        />
      )}

      <div className="table-responsive">
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data Nascimento</th>
              <th>Data Alteração</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="table table-dark">
            {usuarios.map((usuario) => (
              <UsuarioItem
                key={usuario.id}
                usuario={usuario}
                onEditar={() => handleEditar(usuario)}
                onExcluir={() => handleDelete(usuario.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuarioList;
