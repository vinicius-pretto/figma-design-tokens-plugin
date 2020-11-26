import _set from "lodash/set";
import Token from "../../consts/Token";

const toCSS = (tokens) => {
  const cssTokens = tokens
    .map((token: Token) => `  --${token.name}: ${token.value};`)
    .join("\n");

  return `:root {\n${cssTokens}\n}`;
};

const toSCSS = (tokens) => {
  return tokens
    .map((token: Token) => `$${token.name}: ${token.value};`)
    .join("\n");
};

const toJSON = (tokens) => {
  let jsonTokens = {};

  tokens.forEach((token: Token) => {
    _set(jsonTokens, token.name, token.value);
  });
  return JSON.stringify(jsonTokens, null, 2);
};

export default {
  toCSS,
  toSCSS,
  toJSON,
};
