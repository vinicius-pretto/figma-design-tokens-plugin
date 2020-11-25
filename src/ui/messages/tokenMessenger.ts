import EventType from "../../consts/EventType";
import Token from "../../consts/Token";

const TARGET_ORIGIN = "*";

const postGetTokensMessage = () => {
  const message = {
    pluginMessage: {
      type: EventType.GET_TOKENS,
    },
  };
  window.parent.postMessage(message, TARGET_ORIGIN);
};

const postSetTokensMessage = (tokens) => {
  const message = {
    pluginMessage: {
      type: EventType.SET_TOKENS,
      tokens,
    },
  };
  window.parent.postMessage(message, TARGET_ORIGIN);
};

const postSetColorTokenMessage = (token: Token) => {
  const message = {
    pluginMessage: {
      type: EventType.SET_COLOR_TOKEN,
      token,
    },
  };
  window.parent.postMessage(message, TARGET_ORIGIN);
};

const postUpdateColorTokenMessage = (token: Token) => {
  const message = {
    pluginMessage: {
      type: EventType.UPDATE_COLOR_TOKEN,
      token,
    },
  };
  window.parent.postMessage(message, TARGET_ORIGIN);
};

const postDeleteColorTokenMessage = (tokenId: string) => {
  const message = {
    pluginMessage: {
      type: EventType.DELETE_COLOR_TOKEN,
      tokenId,
    },
  };
  window.parent.postMessage(message, TARGET_ORIGIN);
};

export default {
  postGetTokensMessage,
  postSetTokensMessage,
  postSetColorTokenMessage,
  postUpdateColorTokenMessage,
  postDeleteColorTokenMessage,
};
