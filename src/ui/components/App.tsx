import * as React from "react";
import { v4 as uuid } from "uuid";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import _set from "lodash/set";
import { useFormik } from "formik";
import * as yup from "yup";
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

  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Required")
        .max(48, "Maximum 48 characters")
        .matches(
          /^[a-zA-Z]{1,1}[a-zA-Z0-9\-\_]*$/,
          "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)"
        ),
      value: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (!_isEmpty(tokenSelected)) {
        const tokenUpdated = {
          ...tokenSelected,
          name: values.name,
          value: `#${values.value}`,
        };
        updateToken(tokenUpdated);
        return;
      }

      const token = {
        id: uuid(),
        type: TokenType.COLOR,
        name: values.name,
        value: `#${values.value}`,
      };
      const tokens = colorTokens.concat(token);

      onCloseModal();
      clearFields();
      saveTokens(tokens);
    },
  });

  const updateToken = (token) => {
    const colorTokensCopy = _cloneDeep(colorTokens);
    const index = _findIndex(colorTokensCopy, ["id", token.id]);
    colorTokensCopy.splice(index, 1, token);

    saveTokens(colorTokensCopy);
    clearFields();
    onCloseModal();
    tokenMessenger.postUpdateColorTokenMessage(token);
  };

  const clearFields = () => {
    setTokenSelected({});
    formik.resetForm();
  };

  const onCreate = () => {
    clearFields();
    onOpenModal();
  };

  const onUpdateToken = (token: Token) => {
    const values = { name: token.name, value: token.value.slice(1, 7) };
    onOpenModal();
    formik.setValues(values);
    setTokenSelected(token);
  };

  const onDeleteToken = (tokenId: string) => {
    tokenMessenger.postDeleteColorTokenMessage(tokenId);
    tokenMessenger.postGetTokensMessage();
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
    let jsonTokens = {};

    tokens.forEach((token) => {
      _set(jsonTokens, token.name, token.value);
    });
    return JSON.stringify(jsonTokens, null, 2);
  };

  const renderTokensSection = () => {
    if (tabSelected === Tab.CSS) {
      return <TokensSection tokens={parseTokensToCSS(colorTokens)} />;
    }
    if (tabSelected === Tab.SCSS) {
      return <TokensSection tokens={parseTokensToSCSS(colorTokens)} />;
    }
    if (tabSelected === Tab.JSON) {
      return <TokensSection tokens={parseTokensToJSON(colorTokens)} />;
    }
    return (
      <Tokens
        title="Colors"
        tokens={colorTokens}
        onCreate={onCreate}
        onUpdate={onUpdateToken}
        onDelete={onDeleteToken}
        message="No color tokens"
      />
    );
  };

  const formatToHex = (input: string) => {
    if (input.length === 1) {
      return input.repeat(6);
    }
    if (input.length === 2) {
      return input.repeat(3);
    }
    if (input.length > 2 && input.length < 6) {
      const r = input.charAt(0);
      const g = input.charAt(1);
      const b = input.charAt(2);
      return `${r.repeat(2)}${g.repeat(2)}${b.repeat(2)}`;
    }
    return input;
  };

  const onTokenValueInput = (e) => {
    const input = e.target.value.toUpperCase();
    const inputFiltered = input.replace(/[^A-Z|0-9]/g, "");
    e.target.value = inputFiltered;
    formik.handleChange(e);
  };

  const onTokenValueBlur = (e) => {
    const hexColor = formatToHex(e.target.value);
    formik.setFieldValue("value", hexColor);
    formik.handleBlur(e);
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
          <form onSubmit={formik.handleSubmit}>
            <Input
              id="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name}
              touched={formik.touched.name}
              placeholder="color-primary"
            />

            <Input
              id="value"
              type="text"
              maxLength={6}
              value={formik.values.value}
              onChange={onTokenValueInput}
              onBlur={onTokenValueBlur}
              error={formik.errors.value}
              touched={formik.touched.value}
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
