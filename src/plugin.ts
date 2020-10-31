import EventType from "./consts/EventType";
import UiEventType from "./consts/UIEventType";

const uiOptions: ShowUIOptions = {
  width: 500,
  height: 616,
};

figma.showUI(__html__, uiOptions);

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
  figma.closePlugin();
};
