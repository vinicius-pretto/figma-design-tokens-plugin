import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import { useFormik } from "formik";
import UiEventType from "../../consts/UIEventType";
import tokenMessenger from "../messages/tokenMessenger";
import TokenType from "../../consts/TokenType";
import Modal from "./Modal/Modal";
import Tokens from "./Tokens/Tokens";
import Navbar from "./Navbar/Navbar";
import Tab from "../../consts/Tab";
import Token from "../../consts/Token";
import validationSchema from "./Tokens/ColorsForm/validationSchema";
import ColorsForm from "./Tokens/ColorsForm/ColorsForm";
import TokensClipboard from "./TokensClipboard";
import ActionType from "../../consts/ActionType";
import { AppState } from "../redux/store";

const App = () => {
  const colorTokens = useSelector((state: AppState) => state.tokens);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tokenSelected, setTokenSelected] = React.useState({});
  const [tabSelected, setTabSelected] = React.useState(Tab.TOKENS);
  const initialValues = {
    name: "",
    value: "",
  };

  React.useEffect(() => {
    tokenMessenger.postGetTokensMessage();

    window.onmessage = (e) => {
      const { type, values } = e.data.pluginMessage;

      if (type === UiEventType.GET_TOKENS) {
        dispatch({ type: ActionType.SET_TOKENS, payload: values });
      }
    };
  }, []);

  const onSubmit = (values) => {
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
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
    dispatch({ type: ActionType.SET_TOKENS, payload: tokens });
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar
        onClick={(tab: Tab) => setTabSelected(tab)}
        tabSelected={tabSelected}
      />

      <main>
        {tabSelected === Tab.TOKENS ? (
          <Tokens
            title="Colors"
            tokens={colorTokens}
            onCreate={onCreate}
            onUpdate={onUpdateToken}
            onDelete={onDeleteToken}
            message="No color tokens"
          />
        ) : (
          <TokensClipboard tokens={colorTokens} tokensFormat={tabSelected} />
        )}

        <Modal title="Colors" isOpen={isModalOpen} onClose={onCloseModal}>
          <ColorsForm onSubmit={formik.handleSubmit} formik={formik} />
        </Modal>
      </main>
    </>
  );
};

export default App;
