import { useReducer, useEffect } from 'react';
import merge from 'lodash.merge';

let namespace;
let key;
const cache = Object.create(null);
const STORAGE_KEY = 'use_keep_state';

function reducer(prevState, nextState) {
  const v = merge({}, prevState, nextState);
  cache[namespace] = v;
  return v;
}

window.addEventListener('beforeunload', () => {
  if (!namespace) return;
  setStorage();
});

function useKeepState(initState, options) {
  const [state, setState] = useReducer(reducer, initState);

  useEffect(() => {
    if (Object.prototype.toString.call(options) === '[object Object]') {
      options = {
        keepAlive: true,
        sessionStorage: false,
        ...options
      };
    } else {
      options = {
        keepAlive: true,
        sessionStorage: false,
        namespace: options
      };
    }

    namespace = options.namespace;
    key = String(namespace);

    if (options.keepAlive) {
      let v = null;
      if (options.sessionStorage) {
        v = getStorage();
      } else {
        v = cache[namespace] || {};
      }

      v && setState(v);
    }

    return () => {
      if (options.sessionStorage) {
        setStorage();
      }

      if (!options.keepAlive) {
        cache[namespace] = Object.create(null);
      }

      namespace = null;
      key = null;
    };
  }, []);

  return [
    state,
    setState
  ];
}

function getStorage() {
  const content = window.sessionStorage.getItem(STORAGE_KEY);
  const o = Object.create(null);
  if (!content) return o;
  try {
    const json = JSON.parse(content);
    return json;
  } catch {
    return o;
  }
 }
 
function setStorage(v) {
  v = v || cache;
  if (Object.prototype.toString.call(v) !== '[object Object]') return;
  return window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v));
}

export default useKeepState;
