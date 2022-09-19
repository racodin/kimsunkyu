export default class Color {
  /** rgb 코드를 입력하면 hex 코드로 반환 */
  static rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  /** hex 코드를 입력하면 rgb 코드로 반환 */
  static hexToRgb(hex) {
    return hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));
  }

  /** 랜덤 hex 코드 반환 */
  static random() {
    return "#" + Math.round(Math.random() * 0xffffff).toString(16);
  }
}
