import * as React from "react";
import ColorTokens from "./ColorTokens/ColorTokens";
interface Props {
  onDelete: any;
}

const Tokens = ({ onDelete }: Props) => {
  return <ColorTokens onDelete={onDelete} />;
};

export default Tokens;
