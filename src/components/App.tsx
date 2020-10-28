import * as React from "react";
import { v4 as uuid } from "uuid";
import "figma-plugin-ds/dist/figma-plugin-ds.css";
import PencilIcon from "./icons/PencilIcon";
import PlusIcon from "./icons/PlusIcon";
import CloseIcon from "./icons/CloseIcon";
import "../styles/main.css";

enum TokenType {
  COLOR = "color",
}

interface Token {
  id: string;
  type: TokenType;
  name: string;
  value: string;
}

const App = () => {
  const [tokenName, setTokenName] = React.useState("");
  const [tokenValue, setTokenValue] = React.useState("");
  const [colorTokens, setColorTokens] = React.useState([]);

  const openModal = () => {
    document.querySelector("#modal").classList.add("active");
  };

  const closeModal = () => {
    document.querySelector("#modal").classList.remove("active");
  };

  const onSubmitColorToken = (e: React.FormEvent) => {
    e.preventDefault();
    const token = {
      id: uuid(),
      type: TokenType.COLOR,
      name: tokenName,
      value: tokenValue,
    };
    const tokens = colorTokens.concat(token);

    closeModal();
    setTokenName("");
    setTokenValue("");
    setColorTokens(tokens);
  };

  const onMouseEnter = (tokenId: string) => {
    document.querySelector(`#btn-${tokenId}`).classList.remove("hidden");
  };

  const onMouseLeave = (tokenId: string) => {
    document.querySelector(`#btn-${tokenId}`).classList.add("hidden");
  };

  const renderColorTokens = () => {
    return (
      <div className="row mt-lg flex-wrap">
        {colorTokens.map((colorToken: Token) => (
          <div
            key={colorToken.id}
            className="row align-items-center"
            onMouseEnter={() => onMouseEnter(colorToken.id)}
            onMouseLeave={() => onMouseLeave(colorToken.id)}
          >
            <button className="color-token">
              <span
                className="color-token-shape"
                style={{ backgroundColor: colorToken.value }}
              ></span>
              <span className="mr-sm">{colorToken.name}</span>
            </button>

            <div
              id={`btn-${colorToken.id}`}
              className="icon-button"
              role="button"
              aria-label="Edit"
              tabIndex={0}
            >
              <div className="icon icon--adjust"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#" className="section-title">
              Tokens
            </a>
          </li>
          <li>
            <a href="#" className="label">
              CSS
            </a>
          </li>
          <li>
            <a href="#" className="label">
              SCSS
            </a>
          </li>
          <li>
            <a href="#" className="label">
              JSON
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <section className="tokens-section">
          <div className="tokens-section-header">
            <h3 className="section-title">Colors</h3>

            <div
              className="icon-button"
              role="button"
              aria-label="Add token"
              tabIndex={0}
              onClick={openModal}
            >
              <div className="icon icon--plus"></div>
            </div>
          </div>

          {colorTokens.length === 0 ? (
            <div className="mt-lg">
              <p className="label">No color tokens</p>
            </div>
          ) : (
            renderColorTokens()
          )}
        </section>

        <div id="modal">
          <div className="modal-dialog">
            <div className="modal-dialog-header">
              <h2 className="section-title">Colors</h2>

              <div
                className="icon-button"
                role="button"
                aria-label="Close"
                tabIndex={0}
                onClick={closeModal}
              >
                <div className="icon icon--close"></div>
              </div>
            </div>

            <form className="modal-dialog-body" onSubmit={onSubmitColorToken}>
              <div className="input">
                <input
                  id="name"
                  className="input__field mb-md"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="color-primary"
                />
              </div>

              <div className="input">
                <input
                  id="value"
                  className="input__field mb-md"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  placeholder="#cc0000"
                />
              </div>

              <div className="modal-dialog-footer">
                <button type="submit" className="button button--primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
