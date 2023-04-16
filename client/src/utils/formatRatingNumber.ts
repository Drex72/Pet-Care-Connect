export function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString() + ".0";
  } else {
    return num.toFixed(1);
  }
}
