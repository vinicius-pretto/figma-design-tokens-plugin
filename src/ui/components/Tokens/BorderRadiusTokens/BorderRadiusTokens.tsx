import * as React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import _isEmpty from "lodash/isEmpty";
import BorderRadiusToken from "./BorderRadiusToken";
import TokenType from "../../../../consts/TokenType";
import Token from "../../../../consts/Token";
import validationSchema from "./validationSchema";
import BorderRadiusForm from "./BorderRadiusForm";
import { storeTokens } from "../../../redux/actions";

const BorderRadiusTokens = ({ tokens, onDelete }) => {
  const borderRadiusTokens = tokens.filter(
    (token: Token) => token.type === TokenType.BORDER_RADIUS
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tokenSelected, setTokenSelected] = React.useState({});
  const initialValues = {
    name: "",
    value: "",
  };

  const onSubmit = (values) => {
    const token = {
      id: uuid(),
      type: TokenType.BORDER_RADIUS,
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

      <BorderRadiusForm
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        formik={formik}
      />
    </section>
  );
};

export default BorderRadiusTokens;
