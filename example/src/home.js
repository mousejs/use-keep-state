import React from "react";
import { Link } from "react-router-dom";

const Page1 = () => {
  return (
    <div>
      <div>
        <Link to="/page1">Go Page1</Link>
      </div>
      <div>
        <Link to="/page2">Go Page2</Link>
      </div>
    </div>
  );
};

export default Page1;
