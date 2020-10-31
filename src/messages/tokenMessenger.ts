import EventType from "../consts/EventType";

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

export default {
  postGetTokensMessage,
  postSetTokensMessage,
};
