import { observable, action, computed } from 'mobx';

export default class Counter {
  @observable count;

  constructor() {
    this.count = 0;
  }

  @computed get asStr() {
    return `Count: ${this.count}`;
  }

  @action
  add(num) {
    this.count += num;
  }

  @action
  sub(num) {
    this.count -= num;
  }

  @action
  inc() {
    this.add(1);
  }

  @action
  dec() {
    this.sub(1);
  }
}
