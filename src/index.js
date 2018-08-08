import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/App';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './fontello/css/fontello.css';
import './foundation.css';
import './index.css';
import './components/app.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
  	<Router />
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
