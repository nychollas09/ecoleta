import React from 'react';
import Logo from '../../../assets/logo.svg';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const REFERENCE_CREATE_POINT = 'create-point';

export const Header = () => {
  return (
    <header id="primary-header">
      <img src={Logo} alt="Ecoleta" />
      {useLocation().pathname.includes(REFERENCE_CREATE_POINT) ? (
        <Link to="/" className="back-to-home">
          <FiArrowLeft />
          Voltar para a home
        </Link>
      ) : null}
    </header>
  );
};
