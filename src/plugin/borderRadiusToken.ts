import Token from "../consts/Token";
import figmaHelpers from "./figmaHelpers";

const setToken = (node: any, token: Token) => {
  if (typeof node.cornerRadius === "number") {
    const tokens = JSON.stringify([token]);
    node.setPluginData("tokens", tokens);
    node.cornerRadius = Number(token.value);
  }
};

const updateToken = (token: Token) => {
  const nodes = figmaHelpers.findAllNodesByTokenId(token.id);

  nodes.forEach((node: BaseNode) => {
    setToken(node, token);
  });
};

export default {
  setToken,
  updateToken,
};
