import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Header2 from '../../components/Header2';
import api from '../../service/index';
import './style.css';

export default function Cadastro() {
  const [notificacao, setNotificacao] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [params.id]);

  async function handleSubmit(event) {
    event.preventDefault();

    await api
      .put(`customers/${params.id}`, { nome, email, cpf, telefone, status })
      .then(() => {
        toast.success('Usuário editado com sucesso');
        navigate('/');
      })
      .catch((error) => console.log(error));
  }

  function handleBack() {
    localStorage.clear();
    navigate('/');
  }

  function handleClick() {
    api
      .post('/customers', { nome, email, cpf, telefone, status })
      .then(() => {
        if (!nome && !email && !cpf && !telefone && !status) {
          console.error('Por favor, preencha todos os campos');
          return;
        }
        setNome('');
        setEmail('');
        setCpf('');
        setTelefone('');
        setStatus('');
        setNotificacao('Usuário cadastrado com sucesso!');
        setTimeout(() => {
          setNotificacao(null);
        }, 5000);
      })
      .catch((erro) => console.error('ops! ocorreu um erro' + erro));
  }

  useEffect(() => {
    if (params.id) {
      api.get(`customers/${params.id}`).then((response) => {
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setTelefone(response.data.telefone);
        setStatus(response.data.status);
      });
    }
  }, [params.id]);

  return (
    <>
      <section className="section-cadastro">
        <div className="div-herder2">
          <Header2 />
        </div>
        <section className="section-cadastroTwo">
          <div className="titulo-cadastro">
            <strong className="header-cadastro">Novo Usuário</strong>
          </div>
          <div className="paragrafo-cadastro">
            <p>Informe os campos a seguir para criar novo usuário:</p>
          </div>
        </section>
        <form onSubmit={handleSubmit} className="section-cadastroThree">
          <input required value={nome} onChange={({ target }) => setNome(target.value)} type="text" placeholder="Nome" />
          <input required value={email} onChange={({ target }) => setEmail(target.value)} type="text" placeholder="E-mail" />
          <input required value={cpf} onChange={({ target }) => setCpf(target.value)} type="text" placeholder="CPF" />
          <input required value={telefone} onChange={({ target }) => setTelefone(target.value)} type="text" placeholder="telefone" />
          <input required value={status} onChange={({ target }) => setStatus(target.value)} type="text" placeholder="status. por exemplo: ativo, inativo etc" />

          <section className="section-cadastroFour">
            <div>
              <strong>{notificacao}</strong>
            </div>

            {isEdit ? (
              <button type="Submit" className="button-cadastro">
                Editar
              </button>
            ) : (
              <button onClick={handleClick} className="button-cadastro">
                Salvar
              </button>
            )}

            <button onClick={handleBack} className="button-cadastro">
              Voltar
            </button>
          </section>
        </form>

        <ToastContainer />
      </section>
    </>
  );
}
