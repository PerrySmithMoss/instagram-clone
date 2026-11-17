import { act, renderHook } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import useDebounce from "../../hooks/useDebounce";
import { useOnClickOutside } from "../../hooks/useOnClickOustide";

describe("debounced search", () => {
  it("waits for the latest input and cancels previous requests", () => {
    vi.useFakeTimers();
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: "" } },
    );
    rerender({ value: "old" });
    act(() => vi.advanceTimersByTime(500));
    rerender({ value: "latest" });
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("");
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("latest");
    rerender({ value: "" });
    expect(result.current).toBe("");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

it("cleans up outside-click listeners when the component unmounts", () => {
  const element = document.createElement("div");
  document.body.append(element);
  const ref = createRef<HTMLDivElement>();
  ref.current = element;
  const handler = vi.fn();
  const { unmount } = renderHook(() => useOnClickOutside(ref, handler));
  element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  expect(handler).not.toHaveBeenCalled();
  document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  expect(handler).toHaveBeenCalledOnce();
  unmount();
  document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  expect(handler).toHaveBeenCalledOnce();
  element.remove();
});
