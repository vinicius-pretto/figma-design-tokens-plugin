import * as React from "react";
import { v4 as uuid } from "uuid";
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
            <button
              id={`btn-${colorToken.id}`}
              type="button"
              className="btn-icon hidden"
            >
              <PencilIcon />
            </button>
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
            <a href="#" className="active">
              Tokens
            </a>
          </li>
          <li>
            <a href="#">CSS</a>
          </li>
          <li>
            <a href="#">SCSS</a>
          </li>
          <li>
            <a href="#">JSON</a>
          </li>
        </ul>
      </nav>

      <main>
        <section className="tokens-section">
          <div className="tokens-section-header">
            <h3>Colors</h3>

            <button type="button" className="btn-icon" onClick={openModal}>
              <PlusIcon />
            </button>
          </div>

          {colorTokens.length === 0 ? (
            <div className="mt-lg">
              <p className="color-gray">Add your tokens...</p>
            </div>
          ) : (
            renderColorTokens()
          )}
        </section>

        <div id="modal">
          <div className="modal-dialog">
            <div className="modal-dialog-header">
              <h2>Colors</h2>

              <button type="button" className="btn-icon" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <form className="modal-dialog-body" onSubmit={onSubmitColorToken}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  className="input"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="value">Value</label>
                <input
                  id="value"
                  className="input"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                />
              </div>

              <div className="modal-dialog-footer">
                <button type="submit" className="btn-primary">
                  Add
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
