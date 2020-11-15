import React from "react";
import { handleAuth } from "../utils/handleAuth";

const Secret = () => {
  return (
    <h1>
      This is a secret Page, you shall only see if you have a valid token!
    </h1>
  );
};

Secret.getInitialProps = async (ctx) => {
  await handleAuth(ctx);
  return {
      props: {}
  }
};

export default Secret;
