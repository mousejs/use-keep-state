import { useReducer, useEffect } from 'react';

let cache = Object.create(null);
const STORAGE_KEY = 'USE-KEEP-STATE';
const toString = Object.prototype.toString;

window.addEventListener('beforeunload', () => {
  setStorage();
});

function isObject(v) {
  return toString.call(v) === '[object Object]';
}

function useKeepState(initState, options) {
  const namespace = isObject(options) ? options.namespace : options;
  function reducer(prevState, nextState) {
    const v = {
      ...prevState,
      ...nextState
    };
    if (namespace) {
      cache[String(namespace)] = v;
    }

    return v;
  }

  const [state, setState] = useReducer(reducer, initState);

  useEffect(() => {
    if (isObject) {
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

    if (!namespace) {
      options.keepAlive = false;
    }

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
        delete cache[namespace];
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

function _destroy() {
  cache = Object.create(null);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export default useKeepState;
export const destroy = _destroy;
