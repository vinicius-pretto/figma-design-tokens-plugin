import { hexToFigmaRGB } from "@figma-plugin/helpers";
import Token from "../consts/Token";
import figmaHelpers from "./figmaHelpers";

function setToken(node: any, token: Token) {
  if (node.fills && node.fills[0]) {
    const fills = [
      {
        ...node.fills[0],
        color: hexToFigmaRGB(token.value),
      },
    ];
    const tokens = JSON.stringify([token]);
    node.setPluginData("tokens", tokens);
    node.fills = fills;
  }
}

function updateToken(token: Token) {
  const nodes = figma.currentPage.findAll((node: BaseNode) => {
    const tokens = figmaHelpers.getNodeTokens(node);
    return tokens.some((token: Token) => token.id === token.id);
  });

  nodes.forEach((node: BaseNode) => {
    setToken(node, token);
  });
}

export default {
  setToken,
  updateToken,
};
