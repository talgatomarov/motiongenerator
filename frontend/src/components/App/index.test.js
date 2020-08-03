import React from "react";
import { render } from "@testing-library/react";
import App from "./index";

test("Renders withour crashing", () => {
  render(<App />);
});
