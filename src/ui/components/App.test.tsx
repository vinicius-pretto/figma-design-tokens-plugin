import * as React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Tab from "../../consts/Tab";
import tokens from "../../testData/tokens";
import UiEventType from "../../consts/UIEventType";
import postMessage from "../../testHelpers/postMessage";

describe("App", () => {
  describe("tabSelected", () => {
    const eventMessage = {
      type: UiEventType.GET_TOKENS,
      values: tokens,
    };

    it(`renders tokens section when tab selected is ${Tab.TOKENS}`, () => {
      const { getByText } = render(<App />);

      postMessage(eventMessage);

      expect(getByText("color-dark")).toBeInTheDocument();
      expect(getByText("color-yellow")).toBeInTheDocument();
    });

    it(`renders CSS section when tab selected is ${Tab.CSS}`, () => {
      const { getByText, getByTestId } = render(<App />);

      postMessage(eventMessage);

      userEvent.click(getByText("CSS"));

      expect(getByTestId("tokens")).toHaveTextContent(
        ":root { --color-dark: #222; --color-yellow: #ccc000; }"
      );
    });

    it(`renders SCSS section when tab selected is ${Tab.SCSS}`, () => {
      const { getByText, getByTestId } = render(<App />);

      postMessage(eventMessage);

      userEvent.click(getByText("SCSS"));

      expect(getByTestId("tokens")).toHaveTextContent(
        "$color-dark: #222; $color-yellow: #ccc000;"
      );
    });

    it(`renders JSON section when tab selected is ${Tab.JSON}`, () => {
      const { getByText, getByTestId } = render(<App />);

      postMessage(eventMessage);

      userEvent.click(getByText("JSON"));

      expect(getByTestId("tokens")).toHaveTextContent(
        '"color-dark": "#222", "color-yellow": "#ccc000" }'
      );
    });
  });
});
