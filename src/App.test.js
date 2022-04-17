import { render, screen } from "@testing-library/react";
import App from "./App";

test("App renders Draggable and Box", () => {
  render(<App />);

  const DraggableEl = screen.getByText("Draggable Area");
  const BoxEl = screen.getByText("Box");

  expect(DraggableEl).toBeInTheDocument();
  expect(BoxEl).toBeInTheDocument();
});
