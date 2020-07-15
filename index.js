import { useReducer, useEffect } from 'react';

let cache = Object.create(null);
const STORAGE_KEY = 'USE-KEEP-STATE';
const toString = Object.prototype.toString;

function isObject(v) {
  return toString.call(v) === '[object Object]';
}

window.addEventListener('beforeunload', () => {
  setStorage();
});

function useKeepState(initState, options) {
  options = isObject(options)
    ? {
      keepAlive: true,
      sessionStorage: false,
      ...options
    } : {
      keepAlive: true,
      sessionStorage: false,
      namespace: options
    };

  function reducer(prevState, nextState) {
    const value = {
      ...prevState,
      ...nextState
    };
    if (options.namespace) {
      const key = String(options.namespace);
      if (!cache[key]) {
        cache[key] = {};
      }
      cache[key] = {
        storage: options.sessionStorage,
        value
      }
    }

    return value;
  }

  const [state, setState] = useReducer(reducer, initState);

  useEffect(() => {
    const namespace = options.namespace;
    if (!namespace) {
      options.keepAlive = false;
    }

    if (options.keepAlive) {
      if (options.sessionStorage && Object.keys(cache).length <= 0) {
        cache = getStorage();
      }
      const v = cache[namespace]?.value;
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
  const filterNotStorage = {};
  for (let k in v) {
    if (v[k].storage) {
      filterNotStorage[k] = v[k];
    }
  }
  return window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filterNotStorage));
}

export function destroy() {
  cache = Object.create(null);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export default useKeepState;
