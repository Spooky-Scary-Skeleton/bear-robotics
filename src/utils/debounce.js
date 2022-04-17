function debounce(callback, limit = 500) {
  let timer;

  function debounced() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments);
    }, limit);
  }

  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
    }
  };

  return debounced;
}

export default debounce;
