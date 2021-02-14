import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

describe("Input component", () => {
  afterEach(cleanup);

  it("Greeting render props", () => {
    const name = "React";
    render(<Greeting name={name} />);

    expect(screen.queryByText(`Hello, ${name}!`)).toBeTruthy();
  });
});
