import * as React from "react";
import { render, waitFor, screen, fireEvent } from "../../testUtils";
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

  it("update token", async () => {
    render(<App />);

    postMessage({
      type: UiEventType.GET_TOKENS,
      values: tokens,
    });

    const editButton = screen.getByRole("button", {
      name: /edit color-dark/i,
    });

    userEvent.hover(screen.getByText("color-dark"));
    await waitFor(() => userEvent.click(editButton));

    const inputName = screen.getByPlaceholderText("color-primary");
    const inputValue = screen.getByPlaceholderText("#cc0000");
    const submitButton = screen.getByRole("button", { name: /save/i });

    expect(inputName).toHaveValue("color-dark");
    expect(inputValue).toHaveValue("222222");

    await waitFor(() =>
      fireEvent.change(inputName, { target: { value: "color-white" } })
    );
    await waitFor(() =>
      fireEvent.change(inputValue, { target: { value: "FFFFFF" } })
    );
    await waitFor(() => userEvent.click(submitButton));

    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith([
      { ...tokens[0], name: "color-white", value: "#FFFFFF" },
      tokens[1],
    ]);
    expect(tokenMessenger.postUpdateColorTokenMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postUpdateColorTokenMessage).toHaveBeenCalledWith({
      id: "99dd84d3-a355-4a3b-a061-6bab7a8bf285",
      name: "color-white",
      type: "color",
      value: "#FFFFFF",
    });
  });

  it("delete token", async () => {
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
