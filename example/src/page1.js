import React from "react";
import useKeepState from "./lib";

const namespace = Symbol("Page1");

const Page1 = ({ history }) => {
  const [state, setState] = useKeepState(
    {
      value: "Page1"
    },
    {
      namespace,
      sessionStorage: true
    }
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

export default Page1;
