import React from "react";
import useKeepState from "./lib";

const namespace = Symbol("Page2");

const Page2 = ({ history }) => {
  const [state, setState] = useKeepState(
    {
      value: "Page2"
    },
    namespace
  );

  const onChange = e => {
    setState({ value: e.target.value });
  };

  const back = () => {
    history.goBack();
  };

  return (
    <div>
      <input value={state.value} onChange={onChange} />
      <h1>{state.value}</h1>
      <div style={{ marginTop: 30 }}>
        <button type="primary" onClick={back}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Page2;
