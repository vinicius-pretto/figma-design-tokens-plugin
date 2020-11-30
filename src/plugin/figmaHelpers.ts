import Token from "../consts/Token";

function getNodeTokens(node: BaseNode): Array<object> {
  try {
    const tokens = node.getPluginData("tokens");
    return JSON.parse(tokens);
  } catch {
    return [];
  }
}

function findAllNodesByTokenId(tokenId) {
  return figma.currentPage.findAll((node: BaseNode) => {
    const tokens = getNodeTokens(node);
    return tokens.some((token: Token) => token.id === tokenId);
  });
}

export default {
  getNodeTokens,
  findAllNodesByTokenId,
};
