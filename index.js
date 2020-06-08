import { useReducer, useEffect } from 'react';
import merge from 'lodash.merge';

let namespace;
let key;
const cache = Object.create(null);
const storageKey = 'UKP_';

function reducer(prevState, nextState) {
  const v = merge({}, prevState, nextState);
  cache[namespace] = v;
  return v;
}

window.addEventListener('beforeunload', () => {
  if (!namespace) return;
  window.sessionStorage.setItem(
    storageKey + key,
    JSON.stringify(cache[namespace])
  );
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
        try {
          v = JSON.parse(window.sessionStorage.getItem(storageKey + key));
        } catch {
          v = null;
        }
      } else {
        v = cache[namespace];
      }

      v && setState(v);
    }

    return () => {
      if (options.sessionStorage) {
        window.sessionStorage.setItem(
          storageKey + key,
          JSON.stringify(cache[namespace])
        );
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

export default useKeepState;
