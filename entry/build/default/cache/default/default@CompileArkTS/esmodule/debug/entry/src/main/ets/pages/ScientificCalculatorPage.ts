if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScientificCalculatorPage_Params {
    inputValue?: string;
    resultValue?: string;
    currentTheme?: ThemeType;
    isRadianMode?: boolean;
    historyManager?;
    themeManager?;
}
import ScientificCalculatorUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/ScientificCalculatorUtil";
import ThemeManagerUtil, { ThemeType } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManagerUtil";
import HistoryManagerUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/HistoryManagerUtil";
import CalculateUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalculateUtil";
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
class ScientificCalculatorPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.__resultValue = new ObservedPropertySimplePU('', this, "resultValue");
        this.__currentTheme = new ObservedPropertySimplePU(ThemeType.LIGHT, this, "currentTheme");
        this.__isRadianMode = new ObservedPropertySimplePU(false, this, "isRadianMode");
        this.historyManager = HistoryManagerUtil;
        this.themeManager = ThemeManagerUtil;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScientificCalculatorPage_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.resultValue !== undefined) {
            this.resultValue = params.resultValue;
        }
        if (params.currentTheme !== undefined) {
            this.currentTheme = params.currentTheme;
        }
        if (params.isRadianMode !== undefined) {
            this.isRadianMode = params.isRadianMode;
        }
        if (params.historyManager !== undefined) {
            this.historyManager = params.historyManager;
        }
        if (params.themeManager !== undefined) {
            this.themeManager = params.themeManager;
        }
    }
    updateStateVars(params: ScientificCalculatorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__resultValue.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTheme.purgeDependencyOnElmtId(rmElmtId);
        this.__isRadianMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__resultValue.aboutToBeDeleted();
        this.__currentTheme.aboutToBeDeleted();
        this.__isRadianMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __inputValue: ObservedPropertySimplePU<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __resultValue: ObservedPropertySimplePU<string>;
    get resultValue() {
        return this.__resultValue.get();
    }
    set resultValue(newValue: string) {
        this.__resultValue.set(newValue);
    }
    private __currentTheme: ObservedPropertySimplePU<ThemeType>;
    get currentTheme() {
        return this.__currentTheme.get();
    }
    set currentTheme(newValue: ThemeType) {
        this.__currentTheme.set(newValue);
    }
    private __isRadianMode: ObservedPropertySimplePU<boolean>;
    get isRadianMode() {
        return this.__isRadianMode.get();
    }
    set isRadianMode(newValue: boolean) {
        this.__isRadianMode.set(newValue);
    }
    private historyManager;
    private themeManager;
    aboutToAppear() {
        this.currentTheme = this.themeManager.getCurrentTheme();
        // Initialize history manager
        try {
            const context = getContext(this) as common.UIAbilityContext;
            this.historyManager.init(context);
        }
        catch (error) {
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
        }
        else {
            this.resultValue = '';
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        // Top navigation bar
        this.NavigationBar.bind(this)();
        // Input display area
        this.InputDisplay.bind(this)();
        // Result display area
        this.ResultDisplay.bind(this)();
        // Scientific function buttons
        this.ScientificButtons.bind(this)();
        // Basic number pad
        this.NumberPad.bind(this)();
        Column.pop();
    }
    /**
     * Navigation bar component
     */
    NavigationBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width(40);
            Button.height(40);
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(24);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('科学计算器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.Black);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width(50);
            Button.height(30);
            Button.backgroundColor('#4CAF50');
            Button.onClick(() => {
                this.isRadianMode = !this.isRadianMode;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isRadianMode ? 'RAD' : 'DEG');
            Text.fontSize(14);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
        Row.pop();
    }
    /**
     * Input display component
     */
    InputDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(80);
            Column.padding({ left: 20, right: 20 });
            Column.alignItems(HorizontalAlign.End);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.inputValue);
            Text.fontSize(this.inputValue.length > 10 ? 28 : 36);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Medium);
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
    }
    /**
     * Result display component
     */
    ResultDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(40);
            Column.padding({ left: 20, right: 20 });
            Column.alignItems(HorizontalAlign.End);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultValue);
            Text.fontSize(24);
            Text.fontColor('#888888');
        }, Text);
        Text.pop();
        Column.pop();
    }
    /**
     * Scientific function buttons
     */
    ScientificButtons(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, rowIndex: number) => {
                const row = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ top: rowIndex === 0 ? 0 : 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const btn = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('23%');
                            Column.height(40);
                            Column.backgroundColor('#4CAF50');
                            Column.borderRadius(8);
                            Column.justifyContent(FlexAlign.Center);
                            Column.alignItems(HorizontalAlign.Center);
                            Column.onClick(() => this.handleScientificButton(btn));
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(btn);
                            Text.fontSize(14);
                            Text.fontColor(Color.White);
                        }, Text);
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, row, forEachItemGenFunction, (btn: string) => btn, false, false);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, [
                ['sin', 'cos', 'tan', 'ln'],
                ['log', '√', 'x²', 'x³'],
                ['1/x', 'e^x', 'π', 'e'],
                ['n!', '|x|', 'C', 'DEL']
            ], forEachItemGenFunction, (row: string[]) => row.join(','), true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    /**
     * Number pad
     */
    NumberPad(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 16, right: 16, top: 8, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, rowIndex: number) => {
                const row = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ top: rowIndex === 0 ? 0 : 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, btnIndex: number) => {
                        const btn = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('23%');
                            Column.height(55);
                            Column.backgroundColor(btn === '=' ? '#4CAF50' :
                                ['÷', '×', '-', '+'].includes(btn) ? '#E0E0E0' :
                                    Color.White);
                            Column.borderWidth(1);
                            Column.borderColor('#CCCCCC');
                            Column.borderRadius(8);
                            Column.justifyContent(FlexAlign.Center);
                            Column.alignItems(HorizontalAlign.Center);
                            Column.onClick(() => this.handleBasicButton(btn));
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(btn);
                            Text.fontSize(20);
                            Text.fontColor(btn === '=' ? Color.White : Color.Black);
                        }, Text);
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, row, forEachItemGenFunction, (btn: string) => btn, true, false);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, [
                ['7', '8', '9', '÷'],
                ['4', '5', '6', '×'],
                ['1', '2', '3', '-'],
                ['0', '.', '=', '+']
            ], forEachItemGenFunction, (row: string[]) => row.join(','), true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
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
                }
                else {
                    const evalResult = this.evaluateExpression(this.inputValue);
                    if (evalResult !== 'NaN' && evalResult !== '') {
                        result = ScientificCalculatorUtil.abs(evalResult);
                        displayExpression = `|${this.inputValue}|`;
                    }
                    else {
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
                }
                else {
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
        }
        else {
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
                    const isNegativeSign = char === '-' && (i === 0 || // Start of expression
                        '+-*/'.includes(expression[i - 1]) // After another operator
                    );
                    if (isNegativeSign) {
                        // This is a negative sign, add to current token
                        currentToken += char;
                    }
                    else {
                        // This is an operator
                        if (currentToken !== '') {
                            tokens.push(currentToken);
                            currentToken = '';
                        }
                        tokens.push(char === '*' ? '×' : char === '/' ? '÷' : char);
                    }
                }
                else {
                    // Number or decimal point
                    currentToken += char;
                }
            }
            if (currentToken !== '') {
                tokens.push(currentToken);
            }
            // Use CalculateUtil for evaluation
            return CalculateUtil.parseExpression(tokens);
        }
        catch (error) {
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
                }
                else {
                    // Save to history before clearing
                    this.historyManager.addHistory(this.inputValue, resultStr);
                    this.resultValue = `${this.inputValue} = ${resultStr}`;
                    this.inputValue = resultStr;
                }
            }
            catch (e) {
                this.resultValue = 'Error';
            }
        }
        else if (btn === 'C') {
            // Clear
            this.inputValue = '';
            this.resultValue = '';
        }
        else if (btn === 'DEL') {
            // Delete last character
            if (this.inputValue.length > 1) {
                this.inputValue = this.inputValue.slice(0, -1);
            }
            else {
                this.inputValue = '';
            }
            this.updateRealTimeResult();
        }
        else if (['+', '-', '×', '÷'].includes(btn)) {
            this.inputValue += btn;
            this.updateRealTimeResult();
        }
        else if (btn === '.') {
            // Check if current number already has a decimal point
            const parts = this.inputValue.split(/[+\-×÷]/);
            const lastPart = parts[parts.length - 1];
            if (!lastPart.includes('.')) {
                this.inputValue += btn;
                this.updateRealTimeResult();
            }
        }
        else {
            // Number
            this.inputValue += btn;
            this.updateRealTimeResult();
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ScientificCalculatorPage";
    }
}
registerNamedRoute(() => new ScientificCalculatorPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/ScientificCalculatorPage", pageFullPath: "entry/src/main/ets/pages/ScientificCalculatorPage", integratedHsp: "false", moduleType: "followWithHap" });
