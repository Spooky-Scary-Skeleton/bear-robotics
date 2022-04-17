import { fireEvent, render, screen } from "@testing-library/react";
import Draggable from "./Draggable";
import { useState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Draggable", () => {
  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((state) => [state, setState]);
  });

  afterEach(() => {
    jest.clearAllMocks().restoreAllMocks();
  });

  test("Should Calculate bounding rect when child is clicked", () => {
    const spy = jest.spyOn(
      window.HTMLElement.prototype,
      "getBoundingClientRect"
    );
    const child = <div>child</div>;

    render(<Draggable>{child}</Draggable>);

    const BoxEl = screen.getByText("child");

    fireEvent.mouseDown(BoxEl);

    expect(spy.mock.calls.length).toBe(2);
  });

  test("Should only be dragged when it is both clicked and moved", () => {
    const child = <div>child</div>;

    render(<Draggable>{child}</Draggable>);

    const BoxEl = screen.getByText("child");

    fireEvent.mouseDown(BoxEl);
    fireEvent.mouseMove(BoxEl);
    fireEvent.mouseUp(BoxEl);

    expect(setState).toHaveBeenCalledTimes(1);

    fireEvent.mouseMove(BoxEl);

    expect(setState).toHaveBeenCalledTimes(1);
  });
});
