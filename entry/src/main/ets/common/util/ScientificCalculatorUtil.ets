/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Scientific calculator utility class
 * Provides advanced mathematical functions: trigonometric, logarithmic, exponential, etc.
 */
import CheckEmptyUtil from './CheckEmptyUtil';

class ScientificCalculatorUtil {
  /**
   * Calculate sine function
   * @param value Input value in degrees
   * @return Sine result
   */
  sin(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = Math.sin(num * Math.PI / 180);
    return this.formatResult(result);
  }

  /**
   * Calculate cosine function
   * @param value Input value in degrees
   * @return Cosine result
   */
  cos(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = Math.cos(num * Math.PI / 180);
    return this.formatResult(result);
  }

  /**
   * Calculate tangent function
   * @param value Input value in degrees
   * @return Tangent result
   */
  tan(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = Math.tan(num * Math.PI / 180);
    return this.formatResult(result);
  }

  /**
   * Calculate arcsine function
   * @param value Input value
   * @return Arcsine result in degrees
   */
  asin(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    if (num < -1 || num > 1) {
      return 'NaN';
    }
    const result = Math.asin(num) * 180 / Math.PI;
    return this.formatResult(result);
  }

  /**
   * Calculate arccosine function
   * @param value Input value
   * @return Arccosine result in degrees
   */
  acos(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    if (num < -1 || num > 1) {
      return 'NaN';
    }
    const result = Math.acos(num) * 180 / Math.PI;
    return this.formatResult(result);
  }

  /**
   * Calculate arctangent function
   * @param value Input value
   * @return Arctangent result in degrees
   */
  atan(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = Math.atan(num) * 180 / Math.PI;
    return this.formatResult(result);
  }

  /**
   * Calculate natural logarithm (ln)
   * @param value Input value
   * @return Natural logarithm result
   */
  ln(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    if (num <= 0) {
      return 'NaN';
    }
    const result = Math.log(num);
    return this.formatResult(result);
  }

  /**
   * Calculate logarithm base 10 (log)
   * @param value Input value
   * @return Logarithm result
   */
  log(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    if (num <= 0) {
      return 'NaN';
    }
    const result = Math.log10(num);
    return this.formatResult(result);
  }

  /**
   * Calculate exponential function (e^x)
   * @param value Input value
   * @return Exponential result
   */
  exp(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = Math.exp(num);
    return this.formatResult(result);
  }

  /**
   * Calculate power function (x^y)
   * @param base Base value
   * @param exponent Exponent value
   * @return Power result
   */
  power(base: string, exponent: string): string {
    if (CheckEmptyUtil.isEmpty(base) || CheckEmptyUtil.isEmpty(exponent)) {
      return 'NaN';
    }
    const baseNum = parseFloat(base);
    const expNum = parseFloat(exponent);
    const result = Math.pow(baseNum, expNum);
    return this.formatResult(result);
  }

  /**
   * Calculate square root
   * @param value Input value
   * @return Square root result
   */
  sqrt(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    if (num < 0) {
      return 'NaN';
    }
    const result = Math.sqrt(num);
    return this.formatResult(result);
  }

  /**
   * Calculate cube root
   * @param value Input value
   * @return Cube root result
   */
  cbrt(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = Math.cbrt(num);
    return this.formatResult(result);
  }

  /**
   * Calculate factorial
   * @param value Input value (must be non-negative integer)
   * @return Factorial result
   */
  factorial(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseInt(value);
    if (num < 0 || num > 170) {
      return 'NaN';
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result.toString();
  }

  /**
   * Calculate reciprocal (1/x)
   * @param value Input value
   * @return Reciprocal result
   */
  reciprocal(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    if (num === 0) {
      return 'NaN';
    }
    const result = 1 / num;
    return this.formatResult(result);
  }

  /**
   * Calculate square (x^2)
   * @param value Input value
   * @return Square result
   */
  square(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = num * num;
    return this.formatResult(result);
  }

  /**
   * Calculate absolute value
   * @param value Input value
   * @return Absolute value result
   */
  abs(value: string): string {
    if (CheckEmptyUtil.isEmpty(value)) {
      return 'NaN';
    }
    const num = parseFloat(value);
    const result = Math.abs(num);
    return this.formatResult(result);
  }

  /**
   * Format calculation result
   * @param result Calculation result
   * @return Formatted result string
   */
  private formatResult(result: number): string {
    if (isNaN(result) || !isFinite(result)) {
      return 'NaN';
    }
    // Keep up to 10 decimal places, remove trailing zeros
    const formatted = parseFloat(result.toPrecision(10));
    return formatted.toString();
  }
}

export default new ScientificCalculatorUtil();
