import * as React from "react";
import _isEmpty from "lodash/isEmpty";
import BorderRadiusToken from "./BorderRadiusToken";
import TokenType from "../../../../consts/TokenType";
import Token from "../../../../consts/Token";

const BorderRadiusTokens = ({ tokens, onDelete }) => {
  const borderRadiusTokens = tokens.filter(
    (token: Token) => token.type === TokenType.BORDER_RADIUS
  );

  const onCreate = () => {};

  return (
    <section className="border-bottom p-sm">
      <div className="tokens-section-header">
        <h3 className="section-title">Border Radius</h3>

        <div
          className="icon-button"
          role="button"
          aria-label="Add token"
          tabIndex={0}
          onClick={onCreate}
          data-testid="add-token-btn"
        >
          <div className="icon icon--plus"></div>
        </div>
      </div>

      {_isEmpty(borderRadiusTokens) ? (
        <p className="label my-0">No border radius tokens</p>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          {borderRadiusTokens.map((token: Token) => (
            <BorderRadiusToken
              key={token.id}
              token={token}
              onUpdate={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BorderRadiusTokens;
