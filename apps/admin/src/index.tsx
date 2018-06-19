import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import configureStore from './store';
import styleGlobals from 'styles/global';

if (process.env.NODE_ENV === 'production') require('./tracker');

const store = configureStore();
const rootEl = document.getElementById('root');

declare var module;

const render = Component => {
  styleGlobals();

  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    rootEl,
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default;
    return render(NextRoot);
  });
}
