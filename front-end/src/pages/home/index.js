import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header2 from '../../components/Header2';
import { useNavigate } from 'react-router-dom';
import Status from '../../components/Status';
import Card from '../../components/card';
import api from '../../service';
import './style.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  function editUser(id) {
    navigate(`/editar/${id}`);
  }

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  async function deleteUser(id) {
    await api.delete(`/galera/${id}`);

    setUsers(
      users.filter((user) => {
        return user.id !== id;
      }),
    );

    setId(null);
    handleClose();
  }

  useEffect(() => {
    api.get('/customers').then((response) => {
      setUsers(response.data).catch((error) => console.log(error));
    });
  }, []);

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

        {users &&
          users.length > 0 &&
          users.map((user) => {
            return (
              <Card>
                <div key={user.id} className="section-padrao">
                  <p>{user.nome}</p>
                  <p>{user.email}</p>
                </div>
                <div className="section-padrao">
                  <p>{user.cpf}</p>
                  <p>{user.telefone}</p>
                </div>
                <div className="section-padrao">
                  <Status status={user.status} />
                </div>
                <div className="section-buttons">
                  <button
                    onClick={() => editUser(user.id)}
                    className="editar-button"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      handleShow();
                      setId(user.id);
                    }}
                    className="excluir-button"
                  >
                    Excluir
                  </button>
                </div>
              </Card>
            );
          })}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lista de Usuários</Modal.Title>
          </Modal.Header>

          <Modal.Body>Tem certeza que deseja excluir esse Usuário?</Modal.Body>

          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleClose}>
              Fechar
            </Button>

            <Button variant="outline-danger" onClick={() => deleteUser(id)}>
              Excluir definitivamente
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
}
