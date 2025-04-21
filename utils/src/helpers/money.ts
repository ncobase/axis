import { verifyNumber } from './validator';

/**
 * Calculate the rebate amount
 * @param tm Target amount
 * @param om Original amount
 * @param um Total rebate usage amount
 * @returns {number} Calculated rebate amount
 */
export function calRebateMoney(tm: number, om: number, um: number): number {
  tm = verifyNumber(tm);
  om = verifyNumber(om);
  um = verifyNumber(um);
  return (tm / om) * um || 0;
}

/**
 * Calculate amount based on percentage
 * @param tm Target amount
 * @param p Percentage
 * @returns {number} Calculated amount
 */
export function calRebateRRMoney(tm: number, p: number): number {
  tm = verifyNumber(tm);
  p = verifyNumber(p);
  return tm * (p / 100) || 0;
}

/**
 * Calculate percentage based on usage amount
 * @param um Usage amount
 * @param om Original amount
 * @returns {number} Calculated percentage
 */
export function calPercent(um: number, om: number): number {
  um = verifyNumber(um);
  om = verifyNumber(om);
  return 100 * (um / om) || 0;
}
