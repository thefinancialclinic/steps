/* eslint-disable no-console */
import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

import rootReducer from './reducers/index';

const engine = createEngine('steps');

const reducer = storage.reducer(rootReducer);
const storageMiddleware = storage.createMiddleware(engine);

const composeFn = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk, promise, storageMiddleware];
const enhancer = composeFn(applyMiddleware(...middlewares));
declare var window;
declare var module;

export default function configureStore () {
  const store = createStore(
    rootReducer,
    enhancer
  );

  const load = storage.createLoader(engine);
  load(store);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
