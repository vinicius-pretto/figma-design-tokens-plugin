import * as React from "react";
import { v4 as uuid } from "uuid";
import * as _ from "lodash";
import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "../styles/main.css";
import UiEventType from "../consts/UIEventType";
import tokenMessenger from "../messages/tokenMessenger";
import TokenType from "../consts/TokenType";
import Modal from "./Modal";

interface Token {
  id: string;
  type: TokenType;
  name: string;
  value: string;
}

const App = () => {
  const [tokenName, setTokenName] = React.useState("");
  const [tokenValue, setTokenValue] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [colorTokens, setColorTokens] = React.useState([]);
  const [tokenSelected, setTokenSelected] = React.useState({});

  React.useEffect(() => {
    tokenMessenger.postGetTokensMessage();

    window.onmessage = (e) => {
      const { type, values } = e.data.pluginMessage;

      if (type === UiEventType.GET_TOKENS) {
        setColorTokens(values);
      }
    };
  }, []);

  const updateToken = (token) => {
    const tokenUpdated = {
      id: token.id,
      type: token.type,
      name: tokenName,
      value: tokenValue,
    };

    const colorTokensCopy = _.cloneDeep(colorTokens);
    const index = _.findIndex(colorTokensCopy, ["id", token.id]);
    colorTokensCopy.splice(index, 1, tokenUpdated);

    saveTokens(colorTokensCopy);
    setTokenSelected({});
    clearFields();
    onCloseModal();
  };

  const onSubmitColorToken = (e: React.FormEvent) => {
    e.preventDefault();

    if (!_.isEmpty(tokenSelected)) {
      updateToken(tokenSelected);
      return;
    }

    const token = {
      id: uuid(),
      type: TokenType.COLOR,
      name: tokenName,
      value: tokenValue,
    };
    const tokens = colorTokens.concat(token);

    onCloseModal();
    clearFields();
    saveTokens(tokens);
  };

  const onMouseEnter = (tokenId: string) => {
    document.querySelector(`#btn-${tokenId}`).classList.remove("hidden");
  };

  const onMouseLeave = (tokenId: string) => {
    document.querySelector(`#btn-${tokenId}`).classList.add("hidden");
  };

  const clearFields = () => {
    setTokenName("");
    setTokenValue("");
  };

  const onUpdateToken = (token: Token) => {
    onOpenModal();
    setTokenName(token.name);
    setTokenValue(token.value);
    setTokenSelected(token);
  };

  const saveTokens = (tokens) => {
    tokenMessenger.postSetTokensMessage(tokens);
    setColorTokens(tokens);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
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
              onClick={() => onUpdateToken(colorToken)}
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
              onClick={onOpenModal}
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

        <Modal title="Colors" isOpen={isModalOpen} onClose={onCloseModal}>
          <form onSubmit={onSubmitColorToken}>
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
                Save
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </>
  );
};

export default App;
