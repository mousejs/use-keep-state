import React from "react";
import { Input, Button } from "antd";
import useKeepState from "use-keep-state";

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
      <Input value={state.value} onChange={onChange} />
      <div style={{ marginTop: 30 }}>
        <Button type="primary" onClick={back}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Page1;
