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

import ScientificCalculatorUtil from '../common/util/ScientificCalculatorUtil';
import ThemeManagerUtil, { ThemeType } from '../common/util/ThemeManagerUtil';
import HistoryManagerUtil from '../common/util/HistoryManagerUtil';
import CalculateUtil from '../common/util/CalculateUtil';
import { CommonConstants } from '../common/constants/CommonConstants';
import router from '@ohos.router';
import common from '@ohos.app.ability.common';

/**
 * Scientific Calculator Page
 * Provides advanced mathematical functions: trigonometric, logarithmic, exponential, etc.
 */
@Entry
@Component
struct ScientificCalculatorPage {
  @State inputValue: string = '';
  @State resultValue: string = '';
  @State currentTheme: ThemeType = ThemeType.LIGHT;
  @State isRadianMode: boolean = false;
  private historyManager = HistoryManagerUtil;
  private themeManager = ThemeManagerUtil;

  aboutToAppear() {
    this.currentTheme = this.themeManager.getCurrentTheme();
    // Initialize history manager
    try {
      const context = getContext(this) as common.UIAbilityContext;
      this.historyManager.init(context);
    } catch (error) {
      console.error('Failed to initialize history manager: ' + JSON.stringify(error));
    }
  }
  
  /**
   * Update result in real-time
   */
  private updateRealTimeResult() {
    if (this.inputValue === '' || this.inputValue === '-') {
      this.resultValue = '';
      return;
    }
    
    const result = this.evaluateExpression(this.inputValue);
    if (result !== 'NaN' && result !== this.inputValue) {
      this.resultValue = `= ${result}`;
    } else {
      this.resultValue = '';
    }
  }

  build() {
    Column() {
      // Top navigation bar
      this.NavigationBar();
      
      // Input display area
      this.InputDisplay();
      
      // Result display area
      this.ResultDisplay();
      
      // Scientific function buttons
      this.ScientificButtons();
      
      // Basic number pad
      this.NumberPad();
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  /**
   * Navigation bar component
   */
  @Builder NavigationBar() {
    Row() {
      Button({ type: ButtonType.Circle }) {
        Text('←')
          .fontSize(24)
          .fontColor(Color.Black)
      }
      .width(40)
      .height(40)
      .backgroundColor(Color.Transparent)
      .onClick(() => {
        router.back();
      })

      Text('科学计算器')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.Black)
        .layoutWeight(1)
        .textAlign(TextAlign.Center)

      Button({ type: ButtonType.Normal }) {
        Text(this.isRadianMode ? 'RAD' : 'DEG')
          .fontSize(14)
          .fontColor(Color.White)
      }
      .width(50)
      .height(30)
      .backgroundColor('#4CAF50')
      .onClick(() => {
        this.isRadianMode = !this.isRadianMode;
      })
    }
    .width('100%')
    .height(56)
    .padding({ left: 16, right: 16 })
    .backgroundColor(Color.White)
  }

  /**
   * Input display component
   */
  @Builder InputDisplay() {
    Column() {
      Text(this.inputValue)
        .fontSize(this.inputValue.length > 10 ? 28 : 36)
        .fontColor(Color.Black)
        .fontWeight(FontWeight.Medium)
        .maxLines(2)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
    }
    .width('100%')
    .height(80)
    .padding({ left: 20, right: 20 })
    .alignItems(HorizontalAlign.End)
    .justifyContent(FlexAlign.Center)
    .backgroundColor('#F5F5F5')
  }

  /**
   * Result display component
   */
  @Builder ResultDisplay() {
    Column() {
      Text(this.resultValue)
        .fontSize(24)
        .fontColor('#888888')
    }
    .width('100%')
    .height(40)
    .padding({ left: 20, right: 20 })
    .alignItems(HorizontalAlign.End)
    .justifyContent(FlexAlign.Center)
  }

  /**
   * Scientific function buttons
   */
  @Builder ScientificButtons() {
    Column() {
      ForEach([
        ['sin', 'cos', 'tan', 'ln'],
        ['log', '√', 'x²', 'x³'],
        ['1/x', 'e^x', 'π', 'e'],
        ['n!', '|x|', 'C', 'DEL']
      ], (row: string[], rowIndex: number) => {
        Row() {
          ForEach(row, (btn: string) => {
            Column() {
              Text(btn)
                .fontSize(14)
                .fontColor(Color.White)
            }
            .width('23%')
            .height(40)
            .backgroundColor('#4CAF50')
            .borderRadius(8)
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
            .onClick(() => this.handleScientificButton(btn))
          }, (btn: string) => btn)
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: rowIndex === 0 ? 0 : 8 })
      }, (row: string[]) => row.join(','))
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 8, bottom: 8 })
  }

  /**
   * Number pad
   */
  @Builder NumberPad() {
    Column() {
      ForEach([
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+']
      ], (row: string[], rowIndex: number) => {
        Row() {
          ForEach(row, (btn: string, btnIndex: number) => {
            Column() {
              Text(btn)
                .fontSize(20)
                .fontColor(btn === '=' ? Color.White : Color.Black)
            }
            .width('23%')
            .height(55)
            .backgroundColor(
              btn === '=' ? '#4CAF50' :
              ['÷', '×', '-', '+'].includes(btn) ? '#E0E0E0' :
              Color.White
            )
            .borderWidth(1)
            .borderColor('#CCCCCC')
            .borderRadius(8)
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
            .onClick(() => this.handleBasicButton(btn))
          }, (btn: string) => btn)
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: rowIndex === 0 ? 0 : 8 })
      }, (row: string[]) => row.join(','))
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 8, bottom: 16 })
  }

  /**
   * Handle scientific function button click
   */
  handleScientificButton(btn: string) {
    let result: string = '';
    let displayExpression: string = `${btn}(${this.inputValue})`;

    switch (btn) {
      case 'sin':
        result = ScientificCalculatorUtil.sin(this.inputValue);
        break;
      case 'cos':
        result = ScientificCalculatorUtil.cos(this.inputValue);
        break;
      case 'tan':
        result = ScientificCalculatorUtil.tan(this.inputValue);
        break;
      case 'ln':
        result = ScientificCalculatorUtil.ln(this.inputValue);
        break;
      case 'log':
        result = ScientificCalculatorUtil.log(this.inputValue);
        break;
      case '√':
        result = ScientificCalculatorUtil.sqrt(this.inputValue);
        break;
      case 'x²':
        result = ScientificCalculatorUtil.square(this.inputValue);
        break;
      case 'x³':
        result = ScientificCalculatorUtil.power(this.inputValue, '3');
        break;
      case '1/x':
        result = ScientificCalculatorUtil.reciprocal(this.inputValue);
        break;
      case 'e^x':
        result = ScientificCalculatorUtil.exp(this.inputValue);
        break;
      case 'π':
        this.inputValue = Math.PI.toString();
        return;
      case 'e':
        this.inputValue = Math.E.toString();
        return;
      case 'n!':
        result = ScientificCalculatorUtil.factorial(this.inputValue);
        break;
      case '|x|':
        // First evaluate the expression, then take absolute value
        if (this.inputValue === '' || this.inputValue === '-') {
          result = 'NaN';
        } else {
          const evalResult = this.evaluateExpression(this.inputValue);
          if (evalResult !== 'NaN' && evalResult !== '') {
            result = ScientificCalculatorUtil.abs(evalResult);
            displayExpression = `|${this.inputValue}|`;
          } else {
            result = 'NaN';
          }
        }
        break;
      case 'C':
        this.inputValue = '';
        this.resultValue = '';
        return;
      case 'DEL':
        if (this.inputValue.length > 1) {
          this.inputValue = this.inputValue.slice(0, -1);
        } else {
          this.inputValue = '';
        }
        this.updateRealTimeResult();
        return;
      default:
        break;
    }

    if (result !== 'NaN' && result !== '') {
      this.resultValue = `${displayExpression} = ${result}`;
      this.inputValue = result;
      
      // Save to history
      this.historyManager.addHistory(displayExpression, result);
    } else {
      this.resultValue = 'Error';
    }
  }

  /**
   * Evaluate basic arithmetic expression
   */
  private evaluateExpression(expr: string): string {
    try {
      // Simple expression parser for basic arithmetic
      // Replace scientific calculator symbols with standard ones
      let expression = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());
      
      // Remove any whitespace
      expression = expression.replace(/\s+/g, '');
      
      // Tokenization with negative number support
      const tokens: string[] = [];
      let currentToken = '';
      
      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if ('+-*/'.includes(char)) {
          // Check if this is a negative sign (not a subtraction)
          const isNegativeSign = char === '-' && (
            i === 0 ||  // Start of expression
            '+-*/'.includes(expression[i - 1])  // After another operator
          );
          
          if (isNegativeSign) {
            // This is a negative sign, add to current token
            currentToken += char;
          } else {
            // This is an operator
            if (currentToken !== '') {
              tokens.push(currentToken);
              currentToken = '';
            }
            tokens.push(char === '*' ? '×' : char === '/' ? '÷' : char);
          }
        } else {
          // Number or decimal point
          currentToken += char;
        }
      }
      
      if (currentToken !== '') {
        tokens.push(currentToken);
      }
      
      // Use CalculateUtil for evaluation
      return CalculateUtil.parseExpression(tokens);
    } catch (error) {
      console.error('Expression evaluation error:', error);
      return 'NaN';
    }
  }

  /**
   * Handle basic button click
   */
  handleBasicButton(btn: string) {
    if (btn === '=') {
      // Calculate result
      try {
        const resultStr = this.evaluateExpression(this.inputValue);
        
        if (resultStr === 'NaN') {
          this.resultValue = 'Error';
        } else {
          // Save to history before clearing
          this.historyManager.addHistory(this.inputValue, resultStr);
          this.resultValue = `${this.inputValue} = ${resultStr}`;
          this.inputValue = resultStr;
        }
      } catch (e) {
        this.resultValue = 'Error';
      }
    } else if (btn === 'C') {
      // Clear
      this.inputValue = '';
      this.resultValue = '';
    } else if (btn === 'DEL') {
      // Delete last character
      if (this.inputValue.length > 1) {
        this.inputValue = this.inputValue.slice(0, -1);
      } else {
        this.inputValue = '';
      }
      this.updateRealTimeResult();
    } else if (['+', '-', '×', '÷'].includes(btn)) {
      this.inputValue += btn;
      this.updateRealTimeResult();
    } else if (btn === '.') {
      // Check if current number already has a decimal point
      const parts = this.inputValue.split(/[+\-×÷]/);
      const lastPart = parts[parts.length - 1];
      if (!lastPart.includes('.')) {
        this.inputValue += btn;
        this.updateRealTimeResult();
      }
    } else {
      // Number
      this.inputValue += btn;
      this.updateRealTimeResult();
    }
  }
}


