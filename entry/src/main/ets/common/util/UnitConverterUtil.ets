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
 * Unit category enumeration
 */
export enum UnitCategory {
  LENGTH = '长度',
  WEIGHT = '重量',
  TEMPERATURE = '温度',
  AREA = '面积',
  VOLUME = '体积',
  SPEED = '速度',
  TIME = '时间'
}

/**
 * Unit item interface
 */
export interface UnitItem {
  name: string;
  symbol: string;
  toBaseFactor: number;  // Factor to convert to base unit
}

/**
 * Unit conversion result interface
 */
export interface ConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  formatted: string;
}

/**
 * Unit conversion utility class
 * Provides conversion for common units: length, weight, temperature, etc.
 */
class UnitConverterUtil {
  /**
   * Length units (base unit: meter)
   */
  private lengthUnits: Map<string, UnitItem> = new Map([
    ['mm', { name: '毫米', symbol: 'mm', toBaseFactor: 0.001 } as UnitItem],
    ['cm', { name: '厘米', symbol: 'cm', toBaseFactor: 0.01 } as UnitItem],
    ['m', { name: '米', symbol: 'm', toBaseFactor: 1 } as UnitItem],
    ['km', { name: '千米', symbol: 'km', toBaseFactor: 1000 } as UnitItem],
    ['in', { name: '英寸', symbol: 'in', toBaseFactor: 0.0254 } as UnitItem],
    ['ft', { name: '英尺', symbol: 'ft', toBaseFactor: 0.3048 } as UnitItem],
    ['yd', { name: '码', symbol: 'yd', toBaseFactor: 0.9144 } as UnitItem],
    ['mi', { name: '英里', symbol: 'mi', toBaseFactor: 1609.344 } as UnitItem]
  ]);

  /**
   * Weight units (base unit: kilogram)
   */
  private weightUnits: Map<string, UnitItem> = new Map([
    ['mg', { name: '毫克', symbol: 'mg', toBaseFactor: 0.000001 } as UnitItem],
    ['g', { name: '克', symbol: 'g', toBaseFactor: 0.001 } as UnitItem],
    ['kg', { name: '千克', symbol: 'kg', toBaseFactor: 1 } as UnitItem],
    ['t', { name: '吨', symbol: 't', toBaseFactor: 1000 } as UnitItem],
    ['oz', { name: '盎司', symbol: 'oz', toBaseFactor: 0.0283495 } as UnitItem],
    ['lb', { name: '磅', symbol: 'lb', toBaseFactor: 0.453592 } as UnitItem]
  ]);

  /**
   * Temperature units (special handling required)
   */
  private temperatureUnits: Map<string, UnitItem> = new Map([
    ['c', { name: '摄氏度', symbol: '°C', toBaseFactor: 1 } as UnitItem],
    ['f', { name: '华氏度', symbol: '°F', toBaseFactor: 1 } as UnitItem],
    ['k', { name: '开尔文', symbol: 'K', toBaseFactor: 1 } as UnitItem]
  ]);

  /**
   * Area units (base unit: square meter)
   */
  private areaUnits: Map<string, UnitItem> = new Map([
    ['mm2', { name: '平方毫米', symbol: 'mm²', toBaseFactor: 0.000001 } as UnitItem],
    ['cm2', { name: '平方厘米', symbol: 'cm²', toBaseFactor: 0.0001 } as UnitItem],
    ['m2', { name: '平方米', symbol: 'm²', toBaseFactor: 1 } as UnitItem],
    ['km2', { name: '平方千米', symbol: 'km²', toBaseFactor: 1000000 } as UnitItem],
    ['ha', { name: '公顷', symbol: 'ha', toBaseFactor: 10000 } as UnitItem],
    ['ac', { name: '英亩', symbol: 'ac', toBaseFactor: 4046.86 } as UnitItem]
  ]);

  /**
   * Volume units (base unit: liter)
   */
  private volumeUnits: Map<string, UnitItem> = new Map([
    ['ml', { name: '毫升', symbol: 'mL', toBaseFactor: 0.001 } as UnitItem],
    ['l', { name: '升', symbol: 'L', toBaseFactor: 1 } as UnitItem],
    ['m3', { name: '立方米', symbol: 'm³', toBaseFactor: 1000 } as UnitItem],
    ['gal', { name: '加仑', symbol: 'gal', toBaseFactor: 3.78541 } as UnitItem],
    ['qt', { name: '夸脱', symbol: 'qt', toBaseFactor: 0.946353 } as UnitItem]
  ]);

  /**
   * Speed units (base unit: meter per second)
   */
  private speedUnits: Map<string, UnitItem> = new Map([
    ['mps', { name: '米/秒', symbol: 'm/s', toBaseFactor: 1 } as UnitItem],
    ['kph', { name: '千米/时', symbol: 'km/h', toBaseFactor: 0.277778 } as UnitItem],
    ['mph', { name: '英里/时', symbol: 'mph', toBaseFactor: 0.44704 } as UnitItem],
    ['kn', { name: '节', symbol: 'kn', toBaseFactor: 0.514444 } as UnitItem]
  ]);

  /**
   * Time units (base unit: second)
   */
  private timeUnits: Map<string, UnitItem> = new Map([
    ['ms', { name: '毫秒', symbol: 'ms', toBaseFactor: 0.001 } as UnitItem],
    ['s', { name: '秒', symbol: 's', toBaseFactor: 1 } as UnitItem],
    ['min', { name: '分钟', symbol: 'min', toBaseFactor: 60 } as UnitItem],
    ['h', { name: '小时', symbol: 'h', toBaseFactor: 3600 } as UnitItem],
    ['d', { name: '天', symbol: 'd', toBaseFactor: 86400 } as UnitItem],
    ['w', { name: '周', symbol: 'w', toBaseFactor: 604800 } as UnitItem]
  ]);

  /**
   * Get units by category
   * @param category Unit category
   * @return Unit items map
   */
  getUnitsByCategory(category: UnitCategory): Map<string, UnitItem> {
    switch (category) {
      case UnitCategory.LENGTH:
        return this.lengthUnits;
      case UnitCategory.WEIGHT:
        return this.weightUnits;
      case UnitCategory.TEMPERATURE:
        return this.temperatureUnits;
      case UnitCategory.AREA:
        return this.areaUnits;
      case UnitCategory.VOLUME:
        return this.volumeUnits;
      case UnitCategory.SPEED:
        return this.speedUnits;
      case UnitCategory.TIME:
        return this.timeUnits;
      default:
        return new Map();
    }
  }

  /**
   * Convert value from one unit to another
   * @param value Input value
   * @param fromUnit Source unit
   * @param toUnit Target unit
   * @param category Unit category
   * @return Conversion result
   */
  convert(value: number, fromUnit: string, toUnit: string, category: UnitCategory): ConversionResult {
    let result: number;

    // Special handling for temperature
    if (category === UnitCategory.TEMPERATURE) {
      result = this.convertTemperature(value, fromUnit, toUnit);
    } else {
      const units = this.getUnitsByCategory(category);
      const fromUnitItem = units.get(fromUnit);
      const toUnitItem = units.get(toUnit);

      if (!fromUnitItem || !toUnitItem) {
        return {
          value: NaN,
          fromUnit: fromUnit,
          toUnit: toUnit,
          formatted: 'NaN'
        };
      }

      // Convert to base unit, then to target unit
      const baseValue = value * fromUnitItem.toBaseFactor;
      result = baseValue / toUnitItem.toBaseFactor;
    }

    return {
      value: result,
      fromUnit: fromUnit,
      toUnit: toUnit,
      formatted: this.formatResult(result)
    };
  }

  /**
   * Convert temperature (special handling)
   * @param value Input value
   * @param fromUnit Source unit
   * @param toUnit Target unit
   * @return Converted temperature
   */
  private convertTemperature(value: number, fromUnit: string, toUnit: string): number {
    // Convert to Celsius first
    let celsius: number;
    switch (fromUnit) {
      case 'c':
        celsius = value;
        break;
      case 'f':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'k':
        celsius = value - 273.15;
        break;
      default:
        return NaN;
    }

    // Convert from Celsius to target unit
    switch (toUnit) {
      case 'c':
        return celsius;
      case 'f':
        return celsius * 9 / 5 + 32;
      case 'k':
        return celsius + 273.15;
      default:
        return NaN;
    }
  }

  /**
   * Format conversion result
   * @param value Numeric value
   * @return Formatted string
   */
  private formatResult(value: number): string {
    if (isNaN(value) || !isFinite(value)) {
      return 'NaN';
    }

    // Use scientific notation for very large or very small numbers
    if (Math.abs(value) > 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
      return value.toExponential(6);
    }

    // Round to 6 decimal places
    const rounded = Math.round(value * 1e6) / 1e6;
    return rounded.toString();
  }

  /**
   * Get unit name by symbol
   * @param symbol Unit symbol
   * @param category Unit category
   * @return Unit name
   */
  getUnitName(symbol: string, category: UnitCategory): string {
    const units = this.getUnitsByCategory(category);
    const unit = units.get(symbol);
    return unit ? unit.name : symbol;
  }

  /**
   * Get all categories
   * @return Category list
   */
  getAllCategories(): UnitCategory[] {
    return [
      UnitCategory.LENGTH,
      UnitCategory.WEIGHT,
      UnitCategory.TEMPERATURE,
      UnitCategory.AREA,
      UnitCategory.VOLUME,
      UnitCategory.SPEED,
      UnitCategory.TIME
    ];
  }
}

export default new UnitConverterUtil();
