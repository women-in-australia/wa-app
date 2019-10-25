import React from 'react';
import { Layout } from 'antd';

import logo from '../../resources/logo.gif';

const Footer = () => {
  return <Layout.Footer
    style={{
      backgroundColor: 'white',
      borderTop: '4px solid #fa8c16',
      marginTop: 24,
      padding: '0 50px 50px 50px',
    }}
  > 
    <div>
      <img src={logo}></img>
    </div>
    
    <div style={{
      color: '#35675f',
      fontSize: '12px',
      lineHeight: '12px',
      margin: '0 0 0 10px'
    }}>
      An initiative of
      <strong> The National Foundation for Australian Women (NFAW) </strong>
      in conjunction with
      <strong> The University of Melbourne</strong>
    </div>
  </Layout.Footer>;
};

export default Footer;