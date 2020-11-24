import * as React from "react";
import { v4 as uuid } from "uuid";
import * as _ from "lodash";
import { useFormik } from "formik";
import * as yup from "yup";
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
      if (!_.isEmpty(tokenSelected)) {
        const tokenUpdated = {
          ...tokenSelected,
          name: values.name,
          value: values.value,
        };
        updateToken(tokenUpdated);
        return;
      }

      const token = {
        id: uuid(),
        type: TokenType.COLOR,
        name: values.name,
        value: values.value,
      };
      const tokens = colorTokens.concat(token);

      onCloseModal();
      clearFields();
      saveTokens(tokens);
    },
  });

  const updateToken = (token) => {
    const colorTokensCopy = _.cloneDeep(colorTokens);
    const index = _.findIndex(colorTokensCopy, ["id", token.id]);
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
    const values = { name: token.name, value: token.value };
    onOpenModal();
    formik.setValues(values);
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
    let jsonTokens = {};

    tokens.forEach((token) => {
      _.set(jsonTokens, token.name, token.value);
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
              value={formik.values.value}
              onChange={formik.handleChange}
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
