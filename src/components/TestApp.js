import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed, action } from 'mobx';

import { Link } from 'react-router-dom';
import MobxDevTools from './MobxDevTools';

// import DevTools from 'mobx-react-devtools';
import './TestApp.scss';

@observer(['store'])
class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

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
      <div styleName="self">
        <MobxDevTools />
        <button type="button" onClick={() => counter.inc()} styleName="test">
          {this.betterCount}
        </button>
        { appState.authenticated ?
          <button type="button" onClick={this.handleLogoutClick}>logout</button> :
          <button type="button" onClick={this.handleLoginClick}>login</button>
        }
        <hr  />
        <button type="button" onClick={this.handleLoadItemsClick}>load items</button>
        <Link to="/?debug">See debug</Link>
      </div>
    );
  }
}

export default App;
