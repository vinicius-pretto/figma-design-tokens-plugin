import * as React from "react";

const TokensSection = ({ tokens }) => {
  return (
    <div className="p-md">
      <pre className="highlight">{tokens}</pre>
    </div>
  );
};

export default TokensSection;
