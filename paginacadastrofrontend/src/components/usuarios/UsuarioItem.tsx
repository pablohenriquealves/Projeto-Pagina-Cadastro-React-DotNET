import React from 'react';
import { Usuario } from '../../types/usuario.type';

interface UsuarioItemProps {
  usuario: Usuario;
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

const UsuarioItem: React.FC<UsuarioItemProps> = ({ usuario, onEditar, onExcluir }) => {
  const formatarData = (dataString?: string) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <tr>
      <td>{usuario.id}</td>
      <td>{usuario.nome}</td>
      <td>{usuario.email}</td>
      <td>{usuario.telefone || '-'}</td>
      <td>{formatarData(usuario.dataNascimento)}</td>
      <td>{formatarData(usuario.dataCadastro)}</td>
      <td>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => onEditar(usuario)}
            aria-label={`Editar ${usuario.nome}`}
          >
            <i className="bi bi-pencil"></i> Editar
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onExcluir(usuario.id)}
            aria-label={`Excluir ${usuario.nome}`}
          >
            <i className="bi bi-trash"></i> Excluir
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UsuarioItem;
