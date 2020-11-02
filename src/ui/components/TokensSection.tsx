import * as React from "react";

const TokensSection = ({ tokens }) => {
  const copyText = () => {
    const copyText = document.querySelector("#tokens").textContent;
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  return (
    <div className="p-md">
      <div className="highlight">
        <div className="d-flex flex-row justify-content-end mb-sm">
          <button className="button button--primary" onClick={copyText}>
            copy
          </button>
        </div>
        <pre id="tokens">{tokens}</pre>
      </div>
    </div>
  );
};

export default TokensSection;
