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

import UnitConverterUtil, { UnitCategory, UnitItem, ConversionResult } from '../common/util/UnitConverterUtil';
import ThemeManagerUtil, { ThemeType } from '../common/util/ThemeManagerUtil';
import router from '@ohos.router';

/**
 * Unit Converter Page
 * Provides conversion for common units: length, weight, temperature, etc.
 */
@Entry
@Component
struct UnitConverterPage {
  @State inputValue: string = '1';
  @State outputValue: string = '';
  @State selectedCategory: UnitCategory = UnitCategory.LENGTH;
  @State fromUnit: string = 'm';
  @State toUnit: string = 'km';
  @State currentTheme: ThemeType = ThemeType.LIGHT;
  @State availableUnits: Map<string, UnitItem> = new Map();
  
  private unitConverter = UnitConverterUtil;
  private themeManager = ThemeManagerUtil;
  private categories: UnitCategory[] = [];

  aboutToAppear() {
    this.currentTheme = this.themeManager.getCurrentTheme();
    this.categories = this.unitConverter.getAllCategories();
    this.loadUnits();
    this.convert();
  }

  build() {
    Column() {
      // Top navigation bar
      this.NavigationBar();
      
      // Category selector
      this.CategorySelector();
      
      // Input area
      this.InputArea();
      
      // Unit selectors
      this.UnitSelectors();
      
      // Result display
      this.ResultDisplay();
      
      // Quick conversion buttons
      this.QuickConvertButtons();
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.themeManager.getBackgroundColor())
  }

  /**
   * Navigation bar component
   */
  @Builder NavigationBar() {
    Row() {
      Button({ type: ButtonType.Circle }) {
        Text('←')
          .fontSize(24)
          .fontColor(this.themeManager.getTextColor())
      }
      .width(40)
      .height(40)
      .backgroundColor(Color.Transparent)
      .onClick(() => {
        router.back();
      })

      Text('单位转换')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.themeManager.getTextColor())
        .layoutWeight(1)
        .textAlign(TextAlign.Center)

      Blank().width(40)
    }
    .width('100%')
    .height(56)
    .padding({ left: 16, right: 16 })
  }

  /**
   * Category selector component
   */
  @Builder CategorySelector() {
    Scroll() {
      Row() {
        ForEach(this.categories, (category: UnitCategory) => {
          Button(category)
            .height(36)
            .fontSize(14)
            .fontColor(this.selectedCategory === category ? Color.White : this.themeManager.getTextColor())
            .backgroundColor(
              this.selectedCategory === category ? 
              this.themeManager.getScientificButtonColor() : 
              this.themeManager.getButtonBackgroundColor()
            )
            .borderRadius(18)
            .margin({ right: 8 })
            .onClick(() => this.selectCategory(category))
        }, (category: UnitCategory) => category)
      }
      .padding({ left: 16, right: 16 })
    }
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
    .width('100%')
    .height(60)
  }

  /**
   * Input area component
   */
  @Builder InputArea() {
    Column() {
      TextInput({ text: this.inputValue })
        .width('100%')
        .height(60)
        .fontSize(32)
        .fontColor(this.themeManager.getTextColor())
        .backgroundColor(this.themeManager.getInputBackgroundColor())
        .borderRadius(12)
        .textAlign(TextAlign.Center)
        .type(InputType.Number)
        .onChange((value: string) => {
          this.inputValue = value;
          this.convert();
        })
    }
    .width('100%')
    .padding({ left: 20, right: 20, top: 16 })
  }

  /**
   * Unit selectors component
   */
  @Builder UnitSelectors() {
    Row() {
      // From unit selector
      Column() {
        Text('从')
          .fontSize(12)
          .fontColor('#888888')
        
        this.UnitDropdown(true)
      }
      .layoutWeight(1)
      
      // Swap button
      Button({ type: ButtonType.Circle }) {
        Text('⇄')
          .fontSize(24)
          .fontColor(this.themeManager.getTextColor())
      }
      .width(50)
      .height(50)
      .backgroundColor(this.themeManager.getOperatorButtonColor())
      .onClick(() => this.swapUnits())
      
      // To unit selector
      Column() {
        Text('到')
          .fontSize(12)
          .fontColor('#888888')
        
        this.UnitDropdown(false)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .padding({ left: 20, right: 20, top: 16 })
    .justifyContent(FlexAlign.SpaceBetween)
  }

  /**
   * Unit dropdown component
   */
  @Builder UnitDropdown(isFrom: boolean) {
    Select(this.getUnitOptions())
      .width('90%')
      .height(50)
      .selected(this.getSelectedIndex(isFrom))
      .value(isFrom ? this.fromUnit : this.toUnit)
      // .font({ size: 16, color: this.themeManager.getTextColor() })
      .fontColor(this.themeManager.getTextColor())
      // .selectedOptionFont({ size: 16 })
      // .optionFont({ size: 16 })
      .onSelect((index: number) => {
        const units = Array.from(this.availableUnits.keys());
        if (isFrom) {
          this.fromUnit = units[index];
        } else {
          this.toUnit = units[index];
        }
        this.convert();
      })
  }

  /**
   * Result display component
   */
  @Builder ResultDisplay() {
    Column() {
      Text(this.outputValue)
        .fontSize(36)
        .fontColor(this.themeManager.getScientificButtonColor())
        .fontWeight(FontWeight.Bold)
      
      Text(`${this.inputValue} ${this.getUnitSymbol(this.fromUnit)} = ${this.outputValue} ${this.getUnitSymbol(this.toUnit)}`)
        .fontSize(14)
        .fontColor('#888888')
        .margin({ top: 8 })
    }
    .width('100%')
    .height(120)
    .justifyContent(FlexAlign.Center)
  }

  /**
   * Quick conversion buttons
   */
  @Builder QuickConvertButtons() {
    Column() {
      Text('常用转换')
        .fontSize(16)
        .fontColor(this.themeManager.getTextColor())
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 12 })
      
      Grid() {
        ForEach(this.getQuickConversions(), (item: string[]) => {
          GridItem() {
            Button(item[0])
              .width('90%')
              .height(40)
              .fontSize(14)
              .fontColor(this.themeManager.getTextColor())
              .backgroundColor(this.themeManager.getButtonBackgroundColor())
              .borderRadius(8)
              .onClick(() => this.applyQuickConversion(item[1], item[2]))
          }
        }, (item: string[]) => item[0])
      }
      .columnsTemplate('1fr 1fr')
      .rowsTemplate('1fr 1fr')
      .width('100%')
      .height(120)
    }
    .width('100%')
    .padding({ left: 20, right: 20, bottom: 20 })
  }

  /**
   * Load units for selected category
   */
  private loadUnits() {
    this.availableUnits = this.unitConverter.getUnitsByCategory(this.selectedCategory);
    const units = Array.from(this.availableUnits.keys());
    if (units.length >= 2) {
      this.fromUnit = units[0];
      this.toUnit = units[1];
    }
  }

  /**
   * Select category
   */
  private selectCategory(category: UnitCategory) {
    this.selectedCategory = category;
    this.loadUnits();
    this.convert();
  }

  /**
   * Perform conversion
   */
  private convert() {
    const value = parseFloat(this.inputValue);
    if (isNaN(value)) {
      this.outputValue = '0';
      return;
    }

    const result: ConversionResult = this.unitConverter.convert(
      value, 
      this.fromUnit, 
      this.toUnit, 
      this.selectedCategory
    );
    
    this.outputValue = result.formatted;
  }

  /**
   * Swap units
   */
  private swapUnits() {
    const temp = this.fromUnit;
    this.fromUnit = this.toUnit;
    this.toUnit = temp;
    this.convert();
  }

  /**
   * Get unit options for dropdown
   */
  private getUnitOptions(): SelectOption[] {
    const options: SelectOption[] = [];
    this.availableUnits.forEach((value: UnitItem, key: string) => {
      options.push({ value: `${value.symbol} (${value.name})` });
    });
    return options;
  }

  /**
   * Get selected index for dropdown
   */
  private getSelectedIndex(isFrom: boolean): number {
    const units = Array.from(this.availableUnits.keys());
    const targetUnit = isFrom ? this.fromUnit : this.toUnit;
    return units.indexOf(targetUnit);
  }

  /**
   * Get unit symbol
   */
  private getUnitSymbol(unit: string): string {
    const unitItem = this.availableUnits.get(unit);
    return unitItem ? unitItem.symbol : unit;
  }

  /**
   * Get quick conversions based on category
   */
  private getQuickConversions(): string[][] {
    switch (this.selectedCategory) {
      case UnitCategory.LENGTH:
        return [
          ['厘米→英寸', 'cm', 'in'],
          ['米→英尺', 'm', 'ft'],
          ['千米→英里', 'km', 'mi'],
          ['英寸→厘米', 'in', 'cm']
        ];
      case UnitCategory.WEIGHT:
        return [
          ['千克→磅', 'kg', 'lb'],
          ['克→盎司', 'g', 'oz'],
          ['磅→千克', 'lb', 'kg'],
          ['盎司→克', 'oz', 'g']
        ];
      case UnitCategory.TEMPERATURE:
        return [
          ['摄氏→华氏', 'c', 'f'],
          ['华氏→摄氏', 'f', 'c'],
          ['摄氏→开尔文', 'c', 'k'],
          ['开尔文→摄氏', 'k', 'c']
        ];
      default:
        return [];
    }
  }

  /**
   * Apply quick conversion
   */
  private applyQuickConversion(from: string, to: string) {
    this.fromUnit = from;
    this.toUnit = to;
    this.convert();
  }
}


