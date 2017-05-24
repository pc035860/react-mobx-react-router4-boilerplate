import { observable, action } from 'mobx';
import axios from 'axios';

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable items;
  @observable item;

  @observable testval;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.items = [];
    this.item = {};

    this.testval = 'Cobbled together by ';
  }

  async fetchData(pathname, id) {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com${pathname}`
    );
    console.log(data);

    if (data.length > 0) {
      this.setData(data);
    }
    else {
      this.setSingle(data);
    }
    return data.length === 1;
  }

  @action setData(data) {
    this.items = data;
  }

  @action setSingle(data) {
    this.item = data;
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }

  @action authenticate() {
    return new Promise((resolve, reject) => {
      this.authenticating = true;
      setTimeout(() => {
        this.authenticated = !this.authenticated;
        this.authenticating = false;
        resolve(this.authenticated);
      }, 0);
    });
  }
}
