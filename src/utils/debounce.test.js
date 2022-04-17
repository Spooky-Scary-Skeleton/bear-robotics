import debounce from "./debounce";

describe("debounce", () => {
  let mockCallback = jest.fn();
  let callCount = 10;
  let debounceThreshold = 1000;

  beforeEach(() => {
    jest.useFakeTimers();
    debounceThreshold = 1000;
    callCount = 10;
    mockCallback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks().clearAllTimers();
  });

  test("should debounce the callback invocation", () => {
    const debouncedMock = debounce(mockCallback, debounceThreshold);

    for (let i = 0; i < callCount; i++) {
      debouncedMock();
    }

    expect(mockCallback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(debounceThreshold);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    for (let i = 0; i < callCount; i++) {
      jest.advanceTimersByTime(debounceThreshold);
      debouncedMock();
    }

    expect(mockCallback).toHaveBeenCalledTimes(callCount);
  });

  test("should cancel the callback invocation with cancel method", () => {
    const debouncedMock = debounce(mockCallback, debounceThreshold);

    debouncedMock();
    debouncedMock.cancel();
    jest.advanceTimersByTime(debounceThreshold);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});
