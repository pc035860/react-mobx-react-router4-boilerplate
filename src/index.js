import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { rehydrate, hotRehydrate } from 'rfx-core';
import AppErrorReporter from '_components/AppErrorReporter';

import { isProduction } from './utils/constants';
import App from './components/TestApp';
import initStores from './stores/initStores';

initStores();
const store = rehydrate();

const renderApp = (Component) => {
  render(
    <AppContainer errorReporter={AppErrorReporter}>
      <Router>
        <Provider store={isProduction ? store : hotRehydrate()}>
          <App />
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
