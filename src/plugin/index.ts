import { hexToFigmaRGB } from "@figma-plugin/helpers";
import EventType from "../consts/EventType";
import FigmaNodeType from "../consts/FigmaNodeType";
import Token from "../consts/Token";
import UiEventType from "../consts/UIEventType";
import figmaHelpers from "./figmaHelpers";

const uiOptions: ShowUIOptions = {
  width: 400,
  height: 600,
};

figma.showUI(__html__, uiOptions);

function setColorToken(node: any, token: Token) {
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

async function setFontSizeToken(node: any, token: Token) {
  if (node.type === FigmaNodeType.TEXT) {
    await figma.loadFontAsync(node.fontName);
    const tokens = JSON.stringify([token]);
    node.setPluginData("tokens", tokens);
    node.fontSize = Number(token.value);
  }
}

async function setBorderRadiusToken(node: any, token: Token) {
  if (typeof node.cornerRadius === "number") {
    const tokens = JSON.stringify([token]);
    node.setPluginData("tokens", tokens);
    node.cornerRadius = Number(token.value);
  }
}

function setNodeTokens(node: BaseNode, tokens: any) {
  node.setPluginData("tokens", JSON.stringify(tokens));
}

function setAllTokens(tokens) {
  figma.root.setPluginData("tokens", JSON.stringify(tokens));
}

function getAllTokens() {
  try {
    const tokens = JSON.parse(figma.root.getPluginData("tokens"));
    return tokens;
  } catch {
    return [];
  }
}

figma.ui.onmessage = (msg) => {
  if (msg.type === EventType.GET_TOKENS) {
    figma.ui.postMessage({
      type: UiEventType.GET_TOKENS,
      values: getAllTokens(),
    });
    return;
  }

  if (msg.type === EventType.SET_TOKENS) {
    figma.root.setPluginData("tokens", JSON.stringify(msg.tokens));
    return;
  }

  // Colors
  if (msg.type === EventType.SET_COLOR_TOKEN) {
    figma.currentPage.selection.forEach((node: any) => {
      setColorToken(node, msg.token);
    });
    return;
  }

  if (msg.type === EventType.UPDATE_COLOR_TOKEN) {
    const nodes = figma.currentPage.findAll((node: BaseNode) => {
      const tokens = figmaHelpers.getNodeTokens(node);
      return tokens.some((token: Token) => token.id === msg.token.id);
    });
    nodes.forEach((node: BaseNode) => {
      setColorToken(node, msg.token);
    });

    return;
  }

  // Font Size
  if (msg.type === EventType.SET_FONT_SIZE_TOKEN) {
    figma.currentPage.selection.forEach((node: any) => {
      setFontSizeToken(node, msg.payload);
    });
    return;
  }

  if (msg.type === EventType.UPDATE_FONT_SIZE_TOKEN) {
    const nodes = figmaHelpers.findAllNodesByTokenId(msg.payload.id);

    nodes.forEach((node: BaseNode) => {
      setFontSizeToken(node, msg.payload);
    });

    return;
  }

  // Border Radius
  if (msg.type === EventType.SET_BORDER_RADIUS_TOKEN) {
    figma.currentPage.selection.forEach((node: any) => {
      setBorderRadiusToken(node, msg.payload);
    });
    return;
  }

  if (msg.type === EventType.UPDATE_BORDER_RADIUS_TOKEN) {
    const nodes = figmaHelpers.findAllNodesByTokenId(msg.payload.id);

    nodes.forEach((node: BaseNode) => {
      setBorderRadiusToken(node, msg.payload);
    });

    return;
  }

  if (msg.type === EventType.DELETE_COLOR_TOKEN) {
    const nodes = figma.currentPage.findAll((node: BaseNode) => {
      const tokens = figmaHelpers.getNodeTokens(node);
      return tokens.some((token: Token) => token.id === msg.tokenId);
    });

    nodes.forEach((node: BaseNode) => {
      const tokens = figmaHelpers.getNodeTokens(node);
      const tokensUpdated = tokens.filter(
        (token: Token) => token.id !== msg.tokenId
      );
      setNodeTokens(node, tokensUpdated);
    });

    const allTokens = getAllTokens();
    const allTokensUpdated = allTokens.filter(
      (token: Token) => token.id !== msg.tokenId
    );

    setAllTokens(allTokensUpdated);

    return;
  }
  figma.closePlugin();
};
