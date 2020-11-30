import * as React from "react";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";

const FontSizeForm = ({ isModalOpen, onCloseModal, formik }) => {
  return (
    <Modal title="Font Size" isOpen={isModalOpen} onClose={onCloseModal}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          touched={formik.touched.name}
          placeholder="font-size-base"
        />

        <Input
          id="value"
          type="text"
          maxLength={6}
          value={formik.values.value}
          onChange={formik.handleChange}
          error={formik.errors.value}
          touched={formik.touched.value}
          placeholder="16px"
        />

        <div className="d-flex justify-content-end">
          <button type="submit" className="button button--primary">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FontSizeForm;
