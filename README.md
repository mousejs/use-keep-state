> useKeppState for React.js

## useKeppState
Similar to Vue keep-alive, But it is not a component.


## Example
Download this project.
```bash
git clone https://github.com/xjh22222228/use-keep-state.git
cd use-keep-state/example
npm install
npm start
```

Online: 
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
    name: 'name'
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

## License
MIT
