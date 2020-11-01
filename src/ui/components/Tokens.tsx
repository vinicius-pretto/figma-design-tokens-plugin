import * as React from "react";
import * as _ from "lodash";
import Token from "../../consts/Token";

const Tokens = ({ title, tokens, onCreate, onUpdate, message }) => {
  const onMouseEnter = (tokenId: string) => {
    document.querySelector(`#btn-${tokenId}`).classList.remove("hidden");
  };

  const onMouseLeave = (tokenId: string) => {
    document.querySelector(`#btn-${tokenId}`).classList.add("hidden");
  };

  return (
    <section className="tokens-section">
      <div className="tokens-section-header">
        <h3 className="section-title">{title}</h3>

        <div
          className="icon-button"
          role="button"
          aria-label="Add token"
          tabIndex={0}
          onClick={onCreate}
        >
          <div className="icon icon--plus"></div>
        </div>
      </div>

      {_.isEmpty(tokens) ? (
        <div className="mt-lg">
          <p className="label">{message}</p>
        </div>
      ) : (
        <div className="row mt-lg flex-wrap">
          {tokens.map((token: Token) => (
            <div
              key={token.id}
              className="row align-items-center"
              onMouseEnter={() => onMouseEnter(token.id)}
              onMouseLeave={() => onMouseLeave(token.id)}
            >
              <button className="color-token">
                <span
                  className="color-token-shape"
                  style={{ backgroundColor: token.value }}
                ></span>
                <span className="mr-sm">{token.name}</span>
              </button>

              <div
                id={`btn-${token.id}`}
                className="icon-button"
                role="button"
                aria-label="Edit"
                tabIndex={0}
                onClick={() => onUpdate(token)}
              >
                <div className="icon icon--adjust"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Tokens;
