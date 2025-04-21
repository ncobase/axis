/**
 * Convert value to number
 * @param { string } val - Input value to convert
 * @returns {number} Converted number
 */
export const toNumber = (val: string): number => +val;

/**
 * Round a number to specified decimal places
 * @param value - Original value
 * @param length - Number of decimal places to keep, defaults to 2
 * @returns {number} Rounded number with specified decimal places
 */
export const decimals = (value: number | string = 0, length = 2): number => {
  if (value === 0 || value === '0.00' || Number.isNaN(value)) return 0.0;
  value = typeof value === 'string' ? parseFloat(value) : value;
  return Math.round(parseFloat(value.toFixed(length)) * 100) / 100;
};

/**
 * Convert decimal to percentage
 * @param val - Input value to convert
 * @param pre - Number of decimal places to keep in percentage, defaults to 2
 * @returns {string | null} Percentage string with % suffix, or null if invalid input
 */
export function decimalToPercent(val: number | string, pre = 2): string | null {
  if (typeof val === 'string' && val) {
    val = Number(val);
  }
  if (!(typeof val === 'number' && !Number.isNaN(val))) {
    return null;
  }
  val = val * 100;
  const p = Math.pow(10, pre);
  val = Math.round(val * p) / p;
  return val.toFixed(pre) + '%';
}

/**
 * Format number to currency string with thousands separators and 2 decimal places
 * @param num - Number to format
 * @returns {string} Formatted currency string, e.g. '1,234,567.45'
 */
export function formatCurrency(num: any): string {
  num = num.toString().replace(/[$,]/g, '');
  if (Number.isNaN(Number(num))) {
    num = '0';
  }
  const sign = num == (num = Math.abs(Number(num)));
  num = Math.floor(Number(num) * 100 + 0.50000000001);
  let cents: any = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) {
    cents = '0' + cents;
  }
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }
  return (sign ? '' : '-') + num + '.' + cents;
}
