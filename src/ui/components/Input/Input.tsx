import * as React from "react";

interface Props {
  id: string;
  value: string;
  onChange: any;
  placeholder?: string;
}

const Input = ({ id, value, onChange, placeholder }: Props) => {
  return (
    <div className="input">
      <input
        id={id}
        className="input__field mb-md"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
