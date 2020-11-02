import * as React from "react";
import { v4 as uuid } from "uuid";
import * as _ from "lodash";
import "figma-plugin-ds/dist/figma-plugin-ds.css";
import "../styles/main.css";
import UiEventType from "../../consts/UIEventType";
import tokenMessenger from "../messages/tokenMessenger";
import TokenType from "../../consts/TokenType";
import Modal from "./Modal/Modal";
import Tokens from "./Tokens/Tokens";
import Navbar from "./Navbar/Navbar";
import Input from "./Input/Input";
import Tab from "../../consts/Tab";
import TokensSection from "./TokensSection";

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
  const [tabSelected, setTabSelected] = React.useState(Tab.TOKENS);

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
    tokenMessenger.postUpdateColorTokenMessage(tokenUpdated);
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

  const parseTokensToCSS = (tokens) => {
    const cssTokens = tokens
      .map((token: Token) => `  --${token.name}: ${token.value};`)
      .join("\n");

    return `:root {\n${cssTokens}\n}`;
  };

  const parseTokensToSCSS = (tokens) => {
    return tokens
      .map((token: Token) => `$${token.name}: ${token.value};`)
      .join("\n");
  };

  const parseTokensToJSON = (tokens) => {
    return tokens.map((token: Token) => `"${token.name}": "${token.value}"`);
  };

  const renderTokensSection = () => {
    if (tabSelected === Tab.CSS) {
      return <TokensSection tokens={parseTokensToCSS(colorTokens)} />;
    }
    if (tabSelected === Tab.SCSS) {
      return <TokensSection tokens={parseTokensToSCSS(colorTokens)} />;
    }
    if (tabSelected === Tab.JSON) {
      return <TokensSection tokens={JSON.stringify(colorTokens, null, 2)} />;
    }
    return (
      <Tokens
        title="Colors"
        tokens={colorTokens}
        onCreate={onOpenModal}
        onUpdate={onUpdateToken}
        message="No color tokens"
      />
    );
  };

  return (
    <>
      <Navbar
        onClick={(tab: Tab) => setTabSelected(tab)}
        tabSelected={tabSelected}
      />

      <main>
        {renderTokensSection()}

        <Modal title="Colors" isOpen={isModalOpen} onClose={onCloseModal}>
          <form onSubmit={onSubmitColorToken}>
            <Input
              id="name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="color-primary"
            />

            <Input
              id="value"
              value={tokenValue}
              onChange={(e) => setTokenValue(e.target.value)}
              placeholder="#cc0000"
            />

            <div className="d-flex justify-content-end">
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
