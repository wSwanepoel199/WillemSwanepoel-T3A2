import { render } from "@testing-library/react";
import React from "react";

import { NavBar } from "../Components/utils";

test("Renders NavBar", () => {
  render(<NavBar />);
});