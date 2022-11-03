import React from 'react';
import Header2 from '../../components/Header2';
import './style.css';

export default function Home() {
  return (
    <div>
      <section>
        <Header2 />
      </section>

      <section className="container-content">
        <div>
          <h5>Listagem de usuários</h5>
        </div>

        <div className="clients">
          <p>Escolha um cliente para visualizar os detalhes</p>
          <button className="new-user-button">Novo Usuário</button>
        </div>
      </section>
    </div>
  );
}
