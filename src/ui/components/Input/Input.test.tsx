import * as React from "react";
import { render } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("snapshot", () => {
    const { asFragment } = render(
      <Input
        id="name"
        type="text"
        value="#cc0000"
        onChange={jest.fn()}
        placeholder="color-primary"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
