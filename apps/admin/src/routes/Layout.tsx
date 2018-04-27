import React from 'react';
import { injectGlobal } from 'styled-components';
import { Route } from 'react-router-dom';

import Home from './Home';

injectGlobal`
  html, body {
    margin: 0;
    height: 100%;
  }

  body {
    background-color: #151718;
    color: #fafafa;
    font-family: sans-serif;
  }
`;

const Layout = () => (
  <div>
    <Route exact path="/" component={Home} />
  </div>
);

export default Layout;
