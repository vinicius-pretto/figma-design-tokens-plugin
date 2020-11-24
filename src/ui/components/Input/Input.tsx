import * as React from "react";

interface Props {
  id: string;
  type: string;
  value: string;
  onChange: any;
  placeholder?: string;
  error?: any;
  touched?: any;
}

const Input = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  error,
  touched,
}: Props) => {
  const hasError = touched && error;

  return (
    <div className="input mb-sm form-group">
      <input
        id={id}
        type={type}
        className="input__field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <p className={hasError ? "error" : "hidden"}>{error}</p>
    </div>
  );
};

export default Input;
