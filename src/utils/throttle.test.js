import throttle from "./throttle";

describe("throttle", () => {
  let mockCallback = jest.fn();
  let callCount = 10;
  let throttleThreshold = 1000;

  beforeEach(() => {
    jest.useFakeTimers();
    throttleThreshold = 1000;
    callCount = 10;
    mockCallback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks().clearAllTimers();
  });

  test("should throttle the callback invocation", () => {
    const throttledMock = throttle(mockCallback, throttleThreshold);

    for (let i = 0; i < callCount; i++) {
      throttledMock();
    }

    expect(mockCallback).toHaveBeenCalledTimes(1);

    for (let i = 0; i < callCount; i++) {
      throttledMock();
      jest.advanceTimersByTime(throttleThreshold);
    }

    expect(mockCallback).toHaveBeenCalledTimes(callCount);
  });

  test("should cancel the callback invocation with cancel method", () => {
    const throttledMock = throttle(mockCallback, throttleThreshold);

    throttledMock();
    throttledMock.cancel();
    jest.advanceTimersByTime(throttleThreshold);
    throttledMock();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
