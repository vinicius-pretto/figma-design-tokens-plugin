import * as React from "react";
import { render } from "@testing-library/react";
import NavBar from "./Navbar";

describe("Navbar", () => {
  it("snapshot", () => {
    const { asFragment } = render(<NavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
