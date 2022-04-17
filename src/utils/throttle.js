function throttle(callback, limit = 20) {
  let waiting = false;
  let id;

  function throttledFunction() {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      id = setTimeout(() => {
        waiting = false;
      }, limit);
    }
  }

  throttledFunction.cancel = function () {
    if (id) {
      clearTimeout(id);
    }
  };

  return throttledFunction;
}

export default throttle;
