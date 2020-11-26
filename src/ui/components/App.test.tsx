import * as React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Tab from "../../consts/Tab";
import tokens from "../../testData/tokens";
import UiEventType from "../../consts/UIEventType";
import postMessage from "../../testHelpers/postMessage";
import tokenMessenger from "../messages/tokenMessenger";
import TokenType from "../../consts/TokenType";

jest.mock("../messages/tokenMessenger", () => {
  return {
    postGetTokensMessage: jest.fn(),
    postSetTokensMessage: jest.fn(),
  };
});

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  describe("form validation", () => {
    beforeEach(() => {
      render(<App />);

      const addButton = screen.getByTestId("add-token-btn");
      userEvent.click(addButton);
    });

    it("display error when submit empty form", async () => {
      const submitButton = screen.getByRole("button", { name: /save/i });
      await waitFor(() => userEvent.click(submitButton));

      expect(screen.getAllByText("Required")).toHaveLength(2);
      expect(tokenMessenger.postSetTokensMessage).not.toHaveBeenCalled();
    });

    describe("input name", () => {
      it("display error when fill out invalid character", async () => {
        const inputName = screen.getByPlaceholderText("color-primary");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage =
          "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)";

        userEvent.type(inputName, "-/*+");
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      it("display error when length is greather than 48 characters", async () => {
        const inputName = screen.getByPlaceholderText("color-primary");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage = "Maximum 48 characters";

        userEvent.type(inputName, "a".repeat(49));
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe("input value", () => {
      it("replace characters which does not follow the pattern A-Z|0-9", async () => {
        const inputName = screen.getByPlaceholderText("color-primary");
        const inputValue = screen.getByPlaceholderText("#cc0000");
        const submitButton = screen.getByRole("button", { name: /save/i });

        userEvent.type(inputName, "color-primary");
        userEvent.type(inputValue, "/*-)$!%CC0000");
        await waitFor(() => userEvent.click(submitButton));

        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith([
          {
            id: expect.any(String),
            name: "color-primary",
            type: TokenType.COLOR,
            value: "#CC0000",
          },
        ]);
      });
    });
  });
});
