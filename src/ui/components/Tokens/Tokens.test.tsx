import * as React from "react";
import { render } from "../../../testUtils";
import tokens from "../../../testData/tokens";
import Tokens from "./Tokens";

describe("Tokens", () => {
  it("snapshot initial state", () => {
    const { asFragment } = render(<Tokens onDelete={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("snapshot", () => {
    const state = {
      tokens,
    };
    const { asFragment } = render(<Tokens onDelete={jest.fn()} />, state);
    expect(asFragment()).toMatchSnapshot();
  });
});
