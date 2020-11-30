import FigmaNodeType from "../consts/FigmaNodeType";
import Token from "../consts/Token";
import figmaHelpers from "./figmaHelpers";

const setToken = async (node, token: Token) => {
  if (node.type === FigmaNodeType.TEXT) {
    await figma.loadFontAsync(node.fontName);
    const tokens = JSON.stringify([token]);
    node.setPluginData("tokens", tokens);
    node.fontSize = Number(token.value);
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
