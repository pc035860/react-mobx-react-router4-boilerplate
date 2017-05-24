import localforage, { INDEXEDDB, LOCALSTORAGE } from 'localforage';

const SIZE = 4600000;
const VERSION = 1;
const DRIVER = [INDEXEDDB, LOCALSTORAGE];

const expireKey = '__store_expires';

export function willExpire(target, duration) {
  let copy;
  if (Array.isArray(target)) {
    copy = [...target];
  }
  else {
    copy = { ...target };
  }
  copy[expireKey] = +new Date() + duration;
  return copy;
}

export function isExpired(target) {
  if (!(expireKey in target)) {
    return true;
  }
  return +new Date() > target[expireKey];
}

export function createStore(name = 'store', version = VERSION) {
  return localforage.createInstance({
    version,
    size: SIZE,
    driver: LOCALSTORAGE,
    name: `${name}_${version}`,
  });
}

export function createDataStore(name = 'store.data', version = VERSION) {
  return localforage.createInstance({
    version,
    size: SIZE,
    driver: DRIVER,
    name: `${name}_${version}`,
  });
}
