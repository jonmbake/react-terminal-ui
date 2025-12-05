import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Terminal from "../src/index";

// mock localStorage
beforeEach(() => {
  localStorage.clear();
});

describe("Terminal history persistence", () => {
  test("loads history from localStorage on mount", () => {
    const storedHistory = ["ls", "echo hi"];
    localStorage.setItem("terminal-history", JSON.stringify(storedHistory));

    render(<Terminal onInput={() => { }} />);

    const input = screen.getByPlaceholderText("Terminal Hidden Input");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("echo hi");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("ls");
  });

  test("persists history to localStorage after entering a command", () => {
    render(<Terminal onInput={() => { }} />);

    const input = screen.getByPlaceholderText("Terminal Hidden Input");

    fireEvent.change(input, { target: { value: "help" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const stored = JSON.parse(localStorage.getItem("terminal-history")!);

    expect(stored).toEqual(["help"]);
  });

  test("does not persist empty commands", () => {
    render(<Terminal onInput={() => { }} />);

    const input = screen.getByPlaceholderText("Terminal Hidden Input");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(localStorage.getItem("terminal-history")).toBe(JSON.stringify([]));
  });

  test("avoids persisting duplicate consecutive commands", () => {
    render(<Terminal onInput={() => { }} />);

    const input = screen.getByPlaceholderText("Terminal Hidden Input");

    fireEvent.change(input, { target: { value: "date" } });
    fireEvent.keyDown(input, { key: "Enter" });

    fireEvent.change(input, { target: { value: "date" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const stored = JSON.parse(localStorage.getItem("terminal-history")!);

    expect(stored).toEqual(["date"]);
  });

  test("ArrowUp navigates persisted history", () => {
    localStorage.setItem(
      "terminal-history",
      JSON.stringify(["cmd1", "cmd2", "cmd3"]),
    );

    render(<Terminal onInput={() => { }} />);
    const input = screen.getByPlaceholderText("Terminal Hidden Input");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("cmd3");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("cmd2");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("cmd1");
  });

  test("ArrowUp stops at oldest history entry and does not go out of bounds", () => {
    render(<Terminal onInput={() => { }} />);

    const input = screen.getByPlaceholderText("Terminal Hidden Input");

    fireEvent.change(input, { target: { value: "first" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "second" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "third" } });
    fireEvent.keyDown(input, { key: "Enter" });

    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });

    expect(input).toHaveValue("first");
  });
});

test("preserves current input when navigating history and returning back down", () => {
  localStorage.setItem("terminal-history", JSON.stringify(["old1", "old2"]));

  render(<Terminal onInput={() => { }} />);
  const input = screen.getByPlaceholderText("Terminal Hidden Input");

  fireEvent.change(input, { target: { value: "new-typing" } });

  fireEvent.keyDown(input, { key: "ArrowUp" });
  expect(input).toHaveValue("old2");

  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(input).toHaveValue("new-typing");
});

test("does not clear input when ArrowDown is pressed while at latest history entry", () => {
  localStorage.setItem("terminal-history", JSON.stringify(["cmdA", "cmdB"]));

  render(<Terminal onInput={() => { }} />);
  const input = screen.getByPlaceholderText("Terminal Hidden Input");

  fireEvent.keyDown(input, { key: "ArrowUp" });
  expect(input).toHaveValue("cmdB");

  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(input).toHaveValue("");
});
