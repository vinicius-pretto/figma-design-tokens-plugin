import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../../testUtils";
import BorderRadiusTokens from "./BorderRadiusTokens";
import tokens from "../../../../testData/tokens";
import tokenMessenger from "../../../messages/tokenMessenger";
import TokenType from "../../../../consts/TokenType";

jest.mock("../../../messages/tokenMessenger");

describe("BorderRadiusTokens", () => {
  describe("snapshot", () => {
    it("no color tokens", () => {
      const { asFragment } = render(
        <BorderRadiusTokens tokens={[]} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("with color tokens", () => {
      const { asFragment } = render(
        <BorderRadiusTokens tokens={tokens} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("form validation", () => {
    beforeEach(() => {
      render(<BorderRadiusTokens tokens={[]} onDelete={jest.fn()} />);

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
        const inputName = screen.getByPlaceholderText("border-radius-base");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage =
          "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)";

        userEvent.type(inputName, "-/*+");
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      it("display error when length is greather than 48 characters", async () => {
        const inputName = screen.getByPlaceholderText("border-radius-base");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage = "Maximum 48 characters";

        userEvent.type(inputName, "a".repeat(49));
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe("input value", () => {
      it("replace characters which does not follow the pattern A-Z|0-9", async () => {
        const inputName = screen.getByPlaceholderText("border-radius-base");
        const inputValue = screen.getByPlaceholderText("4");
        const submitButton = screen.getByRole("button", { name: /save/i });

        userEvent.type(inputName, "border-radius-base");
        userEvent.type(inputValue, "/*aZ*/-)$!%4");
        await waitFor(() => userEvent.click(submitButton));

        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith([
          {
            id: expect.any(String),
            name: "border-radius-base",
            type: TokenType.BORDER_RADIUS,
            value: "4",
          },
        ]);
      });
    });
  });
});
