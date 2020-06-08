> useKeepState for React.js

## useKeepState
Similar to Vue keep-alive, But it is not a component.


## Example

[codesandbox](https://codesandbox.io/s/intelligent-beaver-qofwd?fontsize=14&hidenavigation=1&theme=dark)


![](https://xiejiahe.gitee.io/public/github/use-keep-state.gif)




## Install
```bash
npm i use-keep-state -S
```

## Usage
```js
import React from 'react';
import useKeepState from 'use-keep-state';

const namespace = Symbol('App');
// Namespaces may conflict.
// const namespace = 'App';

const App = () => {
  const [state, setState] = useKeepState({
    name: 'name',
  }, namespace);

  const onClick = () => {
    setState({ name: 'Button' });
  };

  return (
    <div>
      <h1>{state.name}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}

export default App;
```


## API
useKeepState(initState: object, options: object | string)

options
- namespace  // Unique name `Symbol | String`
- keepAlive  // default `true`
- sessionStorage  // default `false`



## License
MIT
