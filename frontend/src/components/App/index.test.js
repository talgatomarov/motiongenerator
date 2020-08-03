import React from "react";
import { render } from "@testing-library/react";
import App from "./index";

describe("App", () => {
  test("Renders withour crashing", () => {
    render(<App />);
  });
});
