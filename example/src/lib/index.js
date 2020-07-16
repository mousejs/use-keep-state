/*!
 * useKeepState for React v1.2.9
 * https://github.com/mousejs/use-keep-state
 *
 * Copyright xiejiahe and other contributors
 * Released under the MIT license
 * https://github.com/mousejs/use-keep-state/LICENSE
 *
 */
import { useReducer, useEffect, useMemo } from 'react';

let cache = Object.create(null);
const STORAGE_KEY = 'USE-KEEP-STATE';
const toString = Object.prototype.toString;

function isObject(v) {
  return toString.call(v) === '[object Object]';
}

window.addEventListener('beforeunload', () => {
  setStorage();
});

function destroyState(namespace) {
  setTimeout(() => {
    if (namespace) {
      delete cache[namespace];
    } else {
      cache = Object.create(null);
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, 25);
}

function useKeepState(initState, options) {
  options = useMemo(() => {
    return isObject(options)
    ? {
      keepAlive: true,
      sessionStorage: false,
      ...options
    } : {
      keepAlive: true,
      sessionStorage: false,
      namespace: options
    };
  }, [options]);

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

  const [state, setState] = useReducer(reducer, initState, v => {
    const namespace = options.namespace;
    if (!namespace) {
      options.keepAlive = false;
    }

    if (options.keepAlive) {
      if (options.sessionStorage && Object.keys(cache).length <= 0) {
        cache = getStorage();
      }

      const value = cache[namespace] && cache[namespace].value;
      if (value) {
        v = value;
      }
    }
    return v
  });

  useEffect(() => {
    return () => {
      const namespace = options.namespace;
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
    setState,
    destroyState
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
  return window.sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filterNotStorage)
  );
}

export default useKeepState;
