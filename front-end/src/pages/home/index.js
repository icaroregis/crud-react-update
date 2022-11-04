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
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  function redirectRoute() {
    navigate(`/editar`);
  }

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
    await api.delete(`/customers/${id}`);

    setUsers(
      users.filter((user) => {
        return user.id !== id;
      }),
    );

    setId(null);
    handleClose();
  }

  useEffect(() => {
    api
      .get('/customers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, []);

  useEffect(() => {
    if (id) {
      api.get(`customers/${id}`).then((response) => {
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setTelefone(response.data.telefone);
        setStatus(response.data.status);
      });
    }
  }, [id]);

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
          <button onClick={redirectRoute} className="new-user-button">
            Novo Usuário
          </button>
        </div>

        {users && users.length > 0 ? (
          <>
            {users.map((user) => {
              return (
                <Card key={user.id}>
                  <div className="section-padrao">
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
                    <button onClick={() => editUser(user.id)} className="editar-button">
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
          </>
        ) : (
          <>
            <h1>Não existem usuários para listar, cadastre um usuário para gerenciá-lo.</h1>
          </>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lista de Usuários</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <strong>Tem certeza que deseja excluir esse Usuário?</strong>

            <form className="section-cadastroThree">
              <input required value={nome} onChange={({ target }) => setNome(target.value)} type="text" placeholder="Nome" disabled />
              <input required value={email} onChange={({ target }) => setEmail(target.value)} type="text" placeholder="E-mail" disabled />
              <input required value={cpf} onChange={({ target }) => setCpf(target.value)} type="text" placeholder="CPF" disabled />
              <input required value={telefone} onChange={({ target }) => setTelefone(target.value)} type="text" placeholder="telefone" disabled />
              <input required value={status} onChange={({ target }) => setStatus(target.value)} type="text" placeholder="status. por exemplo: ativo, inativo etc" disabled />
            </form>
          </Modal.Body>

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
