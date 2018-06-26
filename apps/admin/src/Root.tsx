import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/index';
import { ThemeProvider } from 'styled-components';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ breakpoints: ['32em', '48em', '64em'] }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
