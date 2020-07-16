> useKeepState for React.js [![HitCount](http://hits.dwyl.com/xjh22222228/use-keep-state.svg)](http://hits.dwyl.com/xjh22222228/use-keep-state) ![GitHub package.json version](https://img.shields.io/github/package-json/v/xjh22222228/use-keep-state) ![GitHub](https://img.shields.io/github/license/xjh22222228/use-keep-state)

## useKeepState
Similar to Vue keep-alive, But it is not a component.


## Example

[codesandbox](https://codesandbox.io/s/mutable-breeze-fo8k7?file=/page-1.js)


![](https://xiejiahe.gitee.io/public/github/use-keep-state.gif)




## Install
```bash
npm i use-keep-state -S
```

## Example
No.1 Demo
```js
import React from 'react';
import useKeepState from 'use-keep-state';

// Must be unique
const namespace = 'App';

const initState = {
  number: 0
};

const App = () => {
  const [state, setState] = useKeepState(initState, namespace);

  const onClick = () => {
    setState({ number: state.number + 1 });
  };

  return (
    <div>
      <h1>{state.number}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}

export default App;
```

No.2 Demo
```js
import React from 'react';
import useKeepState from 'use-keep-state';

// Must be unique
const namespace = 'App';

const initState = {
  number: 0
};

const App = () => {
  const [state, setState, destroyState] = useKeepState(initState, namespace);

  const onClick = () => {
    setState({ number: state.number + 1 });
  };

  React.useEffect(() => {
    // Leave reset state
    return () => destroyState(namespace);
  }, []);

  return (
    <div>
      <h1>{state.number}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}

export default App;
```


## API
useKeepState(initState: object, [options]: object | string)

options
- namespace  // Unique name `String`
- keepAlive  // default `true`
- sessionStorage  // default `false`





## License
MIT
