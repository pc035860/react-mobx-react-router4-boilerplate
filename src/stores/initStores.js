import { store } from 'rfx-core';

import AppState from './AppState';
import Counter from './Counter';

export default () => {
  store.setup({
    appState: AppState,
    counter: Counter
  });
};
