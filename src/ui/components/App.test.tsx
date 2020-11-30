import * as React from "react";
import { render, waitFor, screen, fireEvent } from "../../testUtils";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Tab from "../../consts/Tab";
import tokens from "../../testData/tokens";
import UiEventType from "../../consts/UIEventType";
import postMessage from "../../testHelpers/postMessage";
import tokenMessenger from "../messages/tokenMessenger";

jest.mock("../messages/tokenMessenger", () => {
  return {
    postGetTokensMessage: jest.fn(),
    postSetTokensMessage: jest.fn(),
    postUpdateColorTokenMessage: jest.fn(),
    postDeleteColorTokenMessage: jest.fn(),
  };
});

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("tabSelected", () => {
    beforeEach(() => {
      render(<App />);

      postMessage({
        type: UiEventType.GET_TOKENS,
        values: tokens,
      });
    });

    it(`renders tokens section when tab selected is ${Tab.TOKENS}`, () => {
      expect(screen.getByText("color-dark")).toBeInTheDocument();
      expect(screen.getByText("color-yellow")).toBeInTheDocument();
    });

    it(`renders CSS section when tab selected is ${Tab.CSS}`, () => {
      userEvent.click(screen.getByText("CSS"));

      expect(screen.getByTestId("tokens")).toHaveTextContent(
        ":root { --color-dark: #222222; --color-yellow: #ccc000; }"
      );
    });

    it(`renders SCSS section when tab selected is ${Tab.SCSS}`, () => {
      userEvent.click(screen.getByText("SCSS"));

      expect(screen.getByTestId("tokens")).toHaveTextContent(
        "$color-dark: #222222; $color-yellow: #ccc000;"
      );
    });

    it(`renders JSON section when tab selected is ${Tab.JSON}`, () => {
      userEvent.click(screen.getByText("JSON"));

      expect(screen.getByTestId("tokens")).toHaveTextContent(
        '"color-dark": "#222222", "color-yellow": "#ccc000" }'
      );
    });
  });

  it("delete color token", async () => {
    render(<App />);

    postMessage({
      type: UiEventType.GET_TOKENS,
      values: tokens,
    });

    const deleteButton = screen.getByRole("button", {
      name: /delete color-yellow/i,
    });

    userEvent.hover(screen.getByText("color-yellow"));
    await waitFor(() => userEvent.click(deleteButton));

    expect(tokenMessenger.postDeleteColorTokenMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postDeleteColorTokenMessage).toHaveBeenCalledWith(
      "757e0617-d68f-498c-af84-99579f0783d4"
    );
    expect(tokenMessenger.postGetTokensMessage).toHaveBeenCalledTimes(2);
  });
});