export default class Utils {
  /** 연속 호출되는 함수 중 설정된 시간으로 마지막 함수만 호출한다. */
  static debounce(func, delay = 0) {
    let timer = null;
    return function () {
      const context = this;
      const args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => func.apply(context, arguments), delay);
    };
  }

  /** 함수 호출 후 일정 시간이 지나기 전에 다시 호출 안되도록 한다. */
  static throttle(callback, limit = 100) {
    let waiting = false;
    return function () {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }
}
