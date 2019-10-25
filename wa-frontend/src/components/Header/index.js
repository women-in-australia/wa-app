import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../../resources/logo.gif';
import Navigator from './Navigator';

const Header = () => {
  return <>
    <Layout.Header
      style={{
        backgroundColor: '#fff',
        height: 112,
        zIndex: 2,
        padding: '0 calc(50px + 10%)',
      }}
    >
      <Link to='/' >
        <img
          src={logo}
          style={{
            height: 80,
          }}
        ></img>

        <div style={{
          color: '#35675f',
          fontSize: '12px',
          lineHeight: '12px',
          margin: '3px 0 0 10px'
        }}>
          An initiative of
          <strong> The National Foundation for Australian Women (NFAW) </strong>
          in conjunction with
          <strong> The University of Melbourne</strong>
        </div>
      </Link>
    </Layout.Header>
    <Layout.Header
      style={{
        backgroundColor: '#22075e',
        borderTop: '4px solid #fa8c16',
        height: 52,
        zIndex: 1,
        boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.1)',
        padding: '0 calc(50px + 10%)',
      }}
    >
      <Navigator />
    </Layout.Header>
  </>
  ;
};

export default Header;