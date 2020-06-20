import { useReducer, useEffect } from 'react';

let namespace;
let cache = Object.create(null);
const STORAGE_KEY = 'USE-KEEP-STATE';

function reducer(prevState, nextState) {
  const v = {
    ...prevState,
    ...nextState
  };
  cache[String(namespace)] = v;
  return v;
}

window.addEventListener('beforeunload', () => {
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

    if (options.keepAlive) {
      if (options.sessionStorage && Object.keys(cache).length === 0) {
        cache = getStorage();
      }
      const v = cache[namespace] || cache[String(namespace)];
      v && setState(v);
    }

    return () => {
      if (options.sessionStorage) {
        setStorage();
      }

      if (!options.keepAlive) {
        cache[namespace] = Object.create(null);
      }
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
