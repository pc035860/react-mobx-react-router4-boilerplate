import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { computed, action } from 'mobx';

import DevTools from 'mobx-react-devtools';

@observer(['store'])
class App extends Component {
  constructor(...args) {
    super(...args);

    const { appState, counter } = this.props.store;

    this.appState = appState;
    this.counter = counter;
  }

  @computed get betterCount() {
    console.log('compute better count');

    const { counter, appState } = this;
    const prefix = appState.authenticated ? 'authed' : 'not authed';
    return `[${prefix}] ${counter.count}`;
  }

  handleLoginClick = () => {
    this.appState.authenticate();
  };

  @action('logout action')
  handleLogoutClick = () => {
    this.appState.authenticated = false;
  };

  handleLoadItemsClick = async () => {
    const isSingle = await this.appState.fetchData('/posts');
    console.log('is single', isSingle);
  };

  render() {
    const { counter, appState } = this;
    return (
      <div>
        <DevTools />
        <button type="button" onClick={() => counter.inc()}>
          {this.betterCount}
        </button>
        { appState.authenticated ?
          <button type="button" onClick={this.handleLogoutClick}>logout</button> :
          <button type="button" onClick={this.handleLoginClick}>login</button>
        }
        <hr  />
        <button type="button" onClick={this.handleLoadItemsClick}>load items</button>
      </div>
    );
  }
}

export default App;
