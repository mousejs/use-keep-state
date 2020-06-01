> useKeppState for React.js

## useKeppState
Similar to Vue keep-alive, But it is not a component.


## Example
[codesandbox](https://codesandbox.io/s/intelligent-beaver-qofwd?fontsize=14&hidenavigation=1&theme=dark)



## Install
```bash
npm i use-keep-state -S
```

## Usage
```js
import useKeepState from 'use-keep-state';

const namespace = Symbol('App');

export const App = () => {
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
```

## License
MIT
