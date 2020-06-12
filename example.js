/**
 * Example Code
 * @author xiejiahe
 * See https://codesandbox.io/s/intelligent-beaver-qofwd?fontsize=14&hidenavigation=1&theme=dark
 */
import React from 'react';
import useKeepState from './index';

const namespace = Symbol('App');

export default function App() {
  const [state, setState] = useKeepState({
    increment: 0
  }, namespace);

  const onClick = function() {
    setState({
      increment: state.increment + 1
    })
  }

  return (
    <div>
      <h1>{state.increment}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}
