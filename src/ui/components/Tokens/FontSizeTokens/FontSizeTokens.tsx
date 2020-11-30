import * as React from "react";
import _isEmpty from "lodash/isEmpty";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import Token from "../../../../consts/Token";
import FontSizeToken from "./FontSizeToken";
import FontSizeForm from "./FontSizeForm";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import TokenType from "../../../../consts/TokenType";
import { storeTokens } from "../../../redux/actions";

const FontSizeTokens = ({ tokens, onDelete }) => {
  const fontSizeTokens = tokens.filter(
    (token: Token) => token.type === TokenType.FONT_SIZE
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tokenSelected, setTokenSelected] = React.useState({});
  const initialValues = {
    name: "",
    value: "",
  };

  const onSubmit = (values) => {
    console.log(".......tokens", tokens);
    const token = {
      id: uuid(),
      type: TokenType.FONT_SIZE,
      name: values.name,
      value: values.value,
    };
    const tokensUpdated = tokens.concat(token);

    onCloseModal();
    clearFields();
    dispatch(storeTokens(tokensUpdated));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const clearFields = () => {
    setTokenSelected({});
    formik.resetForm();
  };

  const onCreate = () => {
    clearFields();
    onOpenModal();
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="border-bottom p-sm">
      <div className="tokens-section-header">
        <h3 className="section-title">Font Size</h3>

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

      {_isEmpty(fontSizeTokens) ? (
        <p className="label my-0">No font size tokens</p>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          {fontSizeTokens.map((token: Token) => (
            <FontSizeToken key={token.id} token={token} onDelete={onDelete} />
          ))}
        </div>
      )}

      <FontSizeForm
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        formik={formik}
      />
    </section>
  );
};

export default FontSizeTokens;
