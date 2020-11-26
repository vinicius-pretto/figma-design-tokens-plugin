import * as React from "react";
import { render } from "@testing-library/react";
import Tokens from "./Tokens";

describe("Tokens", () => {
  it("snapshot", () => {
    const tokens = [
      {
        id: "99dd84d3-a355-4a3b-a061-6bab7a8bf285",
        type: "color",
        name: "color-dark",
        value: "#222",
      },
      {
        id: "757e0617-d68f-498c-af84-99579f0783d4",
        type: "color",
        name: "color-yellow",
        value: "#c00",
      },
    ];
    const { asFragment } = render(
      <Tokens
        title="Colors"
        tokens={tokens}
        onCreate={jest.fn()}
        onUpdate={jest.fn()}
        onDelete={jest.fn()}
        message="No color tokens"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
