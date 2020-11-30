import * as React from "react";
import { render } from "../../../../testUtils";
import BorderRadiusTokens from "./BorderRadiusTokens";
import tokens from "../../../../testData/tokens";

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
});
