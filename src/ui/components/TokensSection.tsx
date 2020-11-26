import * as React from "react";

const TokensSection = ({ tokens }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyText = () => {
    const textArea = document.createElement("textarea");
    textArea.value = tokens;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setIsCopied(true);

    const timer = setTimeout(() => {
      setIsCopied(false);
      clearInterval(timer);
    }, 700);
  };

  return (
    <div className="p-md">
      <div className="highlight">
        <div className="d-flex flex-column align-items-end justify-content-end mb-sm">
          <button className="button button--primary" onClick={copyText}>
            copy
          </button>
          <p
            className={isCopied ? "mb-0 mt-md" : "mb-0 mt-md visibility-hidden"}
          >
            Copied to clipboard!
          </p>
        </div>
        <pre data-testid="tokens" id="tokens">
          {tokens}
        </pre>
      </div>
    </div>
  );
};

export default TokensSection;
