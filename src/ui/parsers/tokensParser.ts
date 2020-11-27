import _set from "lodash/set";
import Token from "../../consts/Token";
import TokensFormat from "../../consts/TokensFormat";

const parseToCSS = (tokens: Token[]) => {
  const cssTokens = tokens
    .map((token: Token) => `  --${token.name}: ${token.value};`)
    .join("\n");

  return `:root {\n${cssTokens}\n}`;
};

const parseToSCSS = (tokens: Token[]) => {
  return tokens
    .map((token: Token) => `$${token.name}: ${token.value};`)
    .join("\n");
};

const parseToJSON = (tokens: Token[]) => {
  let jsonTokens = {};

  tokens.forEach((token: Token) => {
    _set(jsonTokens, token.name, token.value);
  });
  return JSON.stringify(jsonTokens, null, 2);
};

const parse = (tokens: Token[], tokensFormat: TokensFormat) => {
  if (tokensFormat === TokensFormat.CSS) {
    return parseToCSS(tokens);
  }
  if (tokensFormat === TokensFormat.SCSS) {
    return parseToSCSS(tokens);
  }
  if (tokensFormat === TokensFormat.JSON) {
    return parseToJSON(tokens);
  }
  return tokens;
};

export default {
  parse,
};
