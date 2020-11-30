import * as React from "react";
import { render } from "../../../../testUtils";
import FontSizeTokens from "./FontSizeTokens";
import tokens from "../../../../testData/tokens";

describe("FontSizeTokens", () => {
  describe("snapshot", () => {
    it("no color tokens", () => {
      const { asFragment } = render(
        <FontSizeTokens tokens={[]} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("with color tokens", () => {
      const { asFragment } = render(
        <FontSizeTokens tokens={tokens} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
