import React from "react";
import { render } from "@testing-library/react";
import { Header } from "../Components/utils";

test("Renders Header", () => {
  render(<Header />);
});