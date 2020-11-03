import { hexToFigmaRGB } from "@figma-plugin/helpers";
import EventType from "../consts/EventType";
import FigmaNodeType from "../consts/FigmaNodeType";
import Token from "../consts/Token";
import UiEventType from "../consts/UIEventType";

const uiOptions: ShowUIOptions = {
  width: 400,
  height: 600,
};

figma.showUI(__html__, uiOptions);

function setColorToken(node, token: Token) {
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

function updateColorToken(node, token: Token) {
  const tokens = getNodeTokens(node);
  const hasToken = tokens.some((token: Token) => token.id === token.id);

  if (hasToken) {
    setColorToken(node, token);
  }
}

function getNodeTokens(node): Array<object> {
  try {
    const tokens = node.getPluginData("tokens");
    return JSON.parse(tokens);
  } catch {
    return [];
  }
}

figma.ui.onmessage = (msg) => {
  if (msg.type === EventType.GET_TOKENS) {
    figma.ui.postMessage({
      type: UiEventType.GET_TOKENS,
      values: JSON.parse(figma.root.getPluginData("tokens")),
    });
    return;
  }
  if (msg.type === EventType.SET_TOKENS) {
    figma.root.setPluginData("tokens", JSON.stringify(msg.tokens));
    return;
  }
  if (msg.type === EventType.SET_COLOR_TOKEN) {
    figma.currentPage.selection.forEach((node: any) => {
      if (node.type === FigmaNodeType.FRAME) {
        const childNode = node.children[0];
        setColorToken(childNode, msg.token);
      } else {
        setColorToken(node, msg.token);
      }
    });
    return;
  }
  if (msg.type === EventType.UPDATE_COLOR_TOKEN) {
    figma.currentPage.children.forEach((node: any) => {
      if (node.type === FigmaNodeType.FRAME) {
        const childNode = node.children[0];
        updateColorToken(childNode, msg.token);
      } else {
        updateColorToken(node, msg.token);
      }
    });
    return;
  }
  figma.closePlugin();
};
