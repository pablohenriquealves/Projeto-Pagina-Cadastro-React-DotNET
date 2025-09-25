import React from 'react';
import UsuarioList from './components/usuarios/UsuarioList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/usuarios/UsuarioForm.css';
import './components/usuarios/UsuarioList.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Cadastro</h1>
      </header>
      <main className="app-main">
        <UsuarioList />
      </main>
    </div>
  );
};

export default App;
