if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    inputValue?: string;
    calValue?: string;
    currentTheme?: ThemeType;
    showMenu?: boolean;
    expressions?: Array<string>;
    themeManager?;
    historyManager?;
}
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
import CalculateUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CalculateUtil";
import CheckEmptyUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/CheckEmptyUtil";
import keysModel from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PresskeysViewModel";
import type { PressKeysBean } from '../viewmodel/PressKeysItem';
import { CommonConstants, Symbol } from "@bundle:com.example.simplecalculator/entry/ets/common/constants/CommonConstants";
import ThemeManagerUtil, { ThemeType } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManagerUtil";
import HistoryManagerUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/HistoryManagerUtil";
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.__calValue = new ObservedPropertySimplePU('', this, "calValue");
        this.__currentTheme = new ObservedPropertySimplePU(ThemeType.LIGHT, this, "currentTheme");
        this.__showMenu = new ObservedPropertySimplePU(false, this, "showMenu");
        this.expressions = [];
        this.themeManager = ThemeManagerUtil;
        this.historyManager = HistoryManagerUtil;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.calValue !== undefined) {
            this.calValue = params.calValue;
        }
        if (params.currentTheme !== undefined) {
            this.currentTheme = params.currentTheme;
        }
        if (params.showMenu !== undefined) {
            this.showMenu = params.showMenu;
        }
        if (params.expressions !== undefined) {
            this.expressions = params.expressions;
        }
        if (params.themeManager !== undefined) {
            this.themeManager = params.themeManager;
        }
        if (params.historyManager !== undefined) {
            this.historyManager = params.historyManager;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__calValue.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTheme.purgeDependencyOnElmtId(rmElmtId);
        this.__showMenu.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__calValue.aboutToBeDeleted();
        this.__currentTheme.aboutToBeDeleted();
        this.__showMenu.aboutToBeDeleted();
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
    private __calValue: ObservedPropertySimplePU<string>;
    get calValue() {
        return this.__calValue.get();
    }
    set calValue(newValue: string) {
        this.__calValue.set(newValue);
    }
    private __currentTheme: ObservedPropertySimplePU<ThemeType>;
    get currentTheme() {
        return this.__currentTheme.get();
    }
    set currentTheme(newValue: ThemeType) {
        this.__currentTheme.set(newValue);
    }
    private __showMenu: ObservedPropertySimplePU<boolean>;
    get showMenu() {
        return this.__showMenu.get();
    }
    set showMenu(newValue: boolean) {
        this.__showMenu.set(newValue);
    }
    private expressions: Array<string>;
    private themeManager;
    private historyManager;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(CommonConstants.FULL_PERCENT);
            Column.backgroundColor({ "id": 16777223, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Column);
        // Top navigation bar with menu
        this.TopNavigationBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.End);
            Column.margin({
                right: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.resultFormat(this.inputValue) });
            TextInput.height(CommonConstants.FULL_PERCENT);
            TextInput.fontSize((this.inputValue.length > CommonConstants.INPUT_LENGTH_MAX) ? { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            TextInput.enabled(false);
            TextInput.fontColor(Color.Black);
            TextInput.textAlign(TextAlign.End);
            TextInput.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, TextInput);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.End);
            Column.margin({
                right: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                bottom: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultFormat(this.calValue));
            Text.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.width(CommonConstants.FULL_PERCENT);
            Column.backgroundColor({ "id": 16777226, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(CommonConstants.FULL_PERCENT);
            Row.alignItems(VerticalAlign.Top);
            Row.margin({
                left: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                right: { "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, columnItemIndex?: number) => {
                const columnItem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.layoutWeight(1);
                    Column.margin({
                        top: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" },
                        bottom: { "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, keyItemIndex?: number) => {
                        const keyItem = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.layoutWeight(((columnItemIndex === (keysModel.getPressKeys().length - 1)) &&
                                (keyItemIndex === (columnItem.length - 1))) ? CommonConstants.TWO : 1);
                            Column.width(CommonConstants.FULL_PERCENT);
                            Column.justifyContent(FlexAlign.Center);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.height(((columnItemIndex === (keysModel.getPressKeys().length - 1)) &&
                                (keyItemIndex === (columnItem.length - 1))) ? { "id": 16777230, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.borderWidth(1);
                            Column.borderColor({ "id": 16777222, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777229, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                            Column.backgroundColor(((columnItemIndex === (keysModel.getPressKeys().length - 1)) &&
                                (keyItemIndex === (columnItem.length - 1))) ? { "id": 16777224, "type": 10001, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : Color.White);
                            Column.alignItems(HorizontalAlign.Center);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                if (keyItem.flag === 0) {
                                    this.inputSymbol(keyItem.value);
                                }
                                else {
                                    this.inputNumber(keyItem.value);
                                }
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (keyItem.flag === 0) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(keyItem.source !== undefined ? keyItem.source : '');
                                        Image.width(keyItem.width);
                                        Image.height(keyItem.height);
                                    }, Image);
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(keyItem.value);
                                        Text.fontSize((keyItem.value === CommonConstants.DOTS) ? { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" } : { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
                                        Text.width(keyItem.width);
                                        Text.height(keyItem.height);
                                    }, Text);
                                    Text.pop();
                                });
                            }
                        }, If);
                        If.pop();
                        Column.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, columnItem, forEachItemGenFunction, (keyItem: PressKeysBean) => JSON.stringify(keyItem), true, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, keysModel.getPressKeys(), forEachItemGenFunction, (item: Array<Array<PressKeysBean>>) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    /**
     * Input Symbols.
     *
     * @param value Input Operators.
     */
    inputSymbol(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return;
        }
        let len = this.expressions.length;
        switch (value) {
            case Symbol.CLEAN:
                this.expressions = [];
                this.calValue = '';
                break;
            case Symbol.DEL:
                this.inputDelete(len);
                break;
            case Symbol.EQU:
                if (len === 0) {
                    return;
                }
                this.getResult().then((result: boolean) => {
                    if (!result) {
                        return;
                    }
                    this.inputValue = this.calValue;
                    this.calValue = '';
                    this.expressions = [];
                    this.expressions.push(this.inputValue);
                });
                break;
            default:
                this.inputOperators(len, value);
                break;
        }
        this.formatInputValue();
    }
    /**
     * Enter numbers.
     *
     * @param value Enter numbers.
     */
    inputNumber(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return;
        }
        let len = this.expressions.length;
        let last = len > 0 ? this.expressions[len - 1] : '';
        let secondLast = len > 1 ? this.expressions[len - CommonConstants.TWO] : undefined;
        if (!this.validateEnter(last, value)) {
            return;
        }
        if (!last) {
            this.expressions.push(value);
        }
        else if (!secondLast) {
            this.expressions[len - 1] += value;
        }
        if (secondLast && CalculateUtil.isSymbol(secondLast)) {
            this.expressions[len - 1] += value;
        }
        if (secondLast && !CalculateUtil.isSymbol(secondLast)) {
            this.expressions.push(value);
        }
        this.formatInputValue();
        if (value !== CommonConstants.DOTS) {
            this.getResult();
        }
    }
    /**
     * Verify that you can enter.
     *
     * @param last Value of the last element.
     * @param value Current input value.
     * return Indicates whether to allow input.
     */
    validateEnter(last: string, value: string) {
        if (!last && value === CommonConstants.PERCENT_SIGN) {
            return false;
        }
        if ((last === CommonConstants.MIN) && (value === CommonConstants.PERCENT_SIGN)) {
            return false;
        }
        if (last.endsWith(CommonConstants.PERCENT_SIGN)) {
            return false;
        }
        if ((last.indexOf(CommonConstants.DOTS) !== -1) && (value === CommonConstants.DOTS)) {
            return false;
        }
        if ((last === '0') && (value !== CommonConstants.DOTS) &&
            (value !== CommonConstants.PERCENT_SIGN)) {
            return false;
        }
        return true;
    }
    /**
     * Delete Key Trigger.
     *
     * @param len Expression Length.
     */
    inputDelete(len: number) {
        if (len === 0) {
            return;
        }
        let last = this.expressions[len - 1];
        let lastLen = last.length;
        if (lastLen === 1) {
            this.expressions.pop();
            len = this.expressions.length;
        }
        else {
            this.expressions[len - 1] = last.slice(0, last.length - 1);
        }
        if (len === 0) {
            this.inputValue = '';
            this.calValue = '';
            return;
        }
        if (!CalculateUtil.isSymbol(this.expressions[len - 1])) {
            this.getResult();
        }
    }
    /**
     * Triggered when input is added, subtracted, multiplied, and divided.
     *
     * @param len Expression Length.
     * @param value Current Input Value.
     */
    inputOperators(len: number, value: string) {
        let last = len > 0 ? this.expressions[len - 1] : undefined;
        let secondLast = len > 1 ? this.expressions[len - CommonConstants.TWO] : undefined;
        if (!last && (value === Symbol.MIN)) {
            this.expressions.push(this.getSymbol(value));
            return;
        }
        if (!last) {
            return;
        }
        if (!CalculateUtil.isSymbol(last)) {
            this.expressions.push(this.getSymbol(value));
            return;
        }
        if ((value === Symbol.MIN) &&
            (last === CommonConstants.MIN || last === CommonConstants.ADD)) {
            this.expressions.pop();
            this.expressions.push(this.getSymbol(value));
            return;
        }
        if (!secondLast) {
            return;
        }
        if (value !== Symbol.MIN) {
            this.expressions.pop();
        }
        if (CalculateUtil.isSymbol(secondLast)) {
            this.expressions.pop();
        }
        this.expressions.push(this.getSymbol(value));
    }
    /**
     * Get Operator.
     *
     * @param value.
     * @return Operators.
     */
    getSymbol(value: string) {
        if (CheckEmptyUtil.isEmpty(value)) {
            return '';
        }
        let symbol = '';
        switch (value) {
            case Symbol.ADD:
                symbol = CommonConstants.ADD;
                break;
            case Symbol.MIN:
                symbol = CommonConstants.MIN;
                break;
            case Symbol.MUL:
                symbol = CommonConstants.MUL;
                break;
            case Symbol.DIV:
                symbol = CommonConstants.DIV;
                break;
            default:
                break;
        }
        return symbol;
    }
    /**
     * Make a deep copy of an expression.
     *
     * @return deep copy expression.
     */
    deepCopy(): Array<string> {
        let copyExpressions: Array<string> = Array.from(this.expressions);
        return copyExpressions;
    }
    /**
     * Obtaining Results.
     *
     * @return Whether the result is incorrect.
     */
    async getResult() {
        let calResult = CalculateUtil.parseExpression(this.deepCopy());
        if (calResult === 'NaN') {
            this.calValue = this.resourceToString({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            return false;
        }
        this.calValue = calResult;
        // Save to history
        const expression = this.expressions.join(' ');
        await this.historyManager.addHistory(expression, calResult);
        return true;
    }
    /**
     * Number Formatting.
     *
     * @param value Formatting parameters.
     * @return Thousand percentile data.
     */
    resultFormat(value: string) {
        let reg = (value.indexOf('.') > -1) ? new RegExp("/(\d)(?=(\d{3})+\.)/g") : new RegExp("/(\d)(?=(?:\d{3})+$)/g");
        return value.replace(reg, '$1,');
    }
    /**
     * Convert a resource file to a string.
     *
     * @param resource Resource file.
     * @return Character string converted from the resource file.
     */
    resourceToString(resource: Resource): string {
        if (CheckEmptyUtil.isEmpty(resource)) {
            return '';
        }
        let result = '';
        try {
            const uiContext: UIContext | undefined = AppStorage.get('uiContext');
            let context = uiContext!.getHostContext()!;
            result = context.resourceManager.getStringSync(resource.id);
        }
        catch (error) {
            Logger.error('[CalculateModel] getResourceString fail: ' + JSON.stringify(error));
        }
        return result;
    }
    /**
     * Thousands in the formatting result.
     */
    formatInputValue() {
        let deepExpressions: Array<string> = [];
        this.deepCopy().forEach((item: string, index: number) => {
            deepExpressions[index] = this.resultFormat(item);
        });
        this.inputValue = deepExpressions.join('');
    }
    /**
     * Top navigation bar with menu
     */
    TopNavigationBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 8, right: 8 });
            Row.backgroundColor(this.themeManager.getBackgroundColor());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Menu button
            Button.createWithChild({ type: ButtonType.Circle });
            // Menu button
            Button.width(44);
            // Menu button
            Button.height(44);
            // Menu button
            Button.backgroundColor(Color.Transparent);
            // Menu button
            Button.onClick(() => {
                this.showMenu = !this.showMenu;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☰');
            Text.fontSize(24);
            Text.fontColor(this.themeManager.getTextColor());
        }, Text);
        Text.pop();
        // Menu button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Title
            Text.create('简易计算器');
            // Title
            Text.fontSize(20);
            // Title
            Text.fontWeight(FontWeight.Bold);
            // Title
            Text.fontColor(this.themeManager.getTextColor());
            // Title
            Text.layoutWeight(1);
            // Title
            Text.textAlign(TextAlign.Center);
        }, Text);
        // Title
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Dropdown menu
            if (this.showMenu) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.DropDownMenu.bind(this)();
                });
            }
            else /**
             * Dropdown menu component
             */ {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    /**
     * Dropdown menu component
     */
    DropDownMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('200vp');
            Column.backgroundColor(this.themeManager.getButtonBackgroundColor());
            Column.borderRadius(12);
            Column.shadow({ radius: 8, color: '#33000000', offsetX: 0, offsetY: 4 });
            Column.position({ x: '8vp', y: '56vp' });
            Column.zIndex(999);
        }, Column);
        // Scientific Calculator
        this.MenuItem.bind(this)('🧪 科学计算器', () => {
            this.showMenu = false;
            router.pushUrl({ url: 'pages/ScientificCalculatorPage' });
        });
        // History
        this.MenuItem.bind(this)('📜 计算历史', () => {
            this.showMenu = false;
            router.pushUrl({ url: 'pages/HistoryPage' });
        });
        // Unit Converter
        this.MenuItem.bind(this)('📏 单位转换', () => {
            this.showMenu = false;
            router.pushUrl({ url: 'pages/UnitConverterPage' });
        });
        Column.pop();
    }
    /**
     * Menu item component
     */
    MenuItem(text: string, onClick: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(48);
            Row.padding({ left: 16, right: 16 });
            Row.onClick(onClick);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.fontSize(16);
            Text.fontColor(this.themeManager.getTextColor());
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
