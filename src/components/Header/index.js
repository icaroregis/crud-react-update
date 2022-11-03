import React from 'react';
import logo from '../../assets/uol-lg.png';
import './style.css';

export default function Header() {
  return (
    <div className="container-header">
      <img className="imagem-header" src={logo} alt="Logo Uol" />
    </div>
  );
}
