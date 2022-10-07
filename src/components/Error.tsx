import React from "react";
import { Block } from "vcc-ui";

/*
  This is Error component, will show the Axios error message while fetching data is getting interrupted.
*/

const Error: React.FC<any> = ({error}: any) => {
  return (
    <Block className="errorBlock">
      {error.message}
    </Block>
  );
};

export default Error;
