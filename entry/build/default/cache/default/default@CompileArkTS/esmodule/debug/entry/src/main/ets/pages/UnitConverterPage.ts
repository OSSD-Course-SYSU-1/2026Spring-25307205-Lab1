if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UnitConverterPage_Params {
    inputValue?: string;
    outputValue?: string;
    selectedCategory?: UnitCategory;
    fromUnit?: string;
    toUnit?: string;
    currentTheme?: ThemeType;
    availableUnits?: Map<string, UnitItem>;
    unitConverter?;
    themeManager?;
    categories?: UnitCategory[];
}
import UnitConverterUtil, { UnitCategory } from "@bundle:com.example.simplecalculator/entry/ets/common/util/UnitConverterUtil";
import type { UnitItem, ConversionResult } from "@bundle:com.example.simplecalculator/entry/ets/common/util/UnitConverterUtil";
import ThemeManagerUtil, { ThemeType } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManagerUtil";
import router from "@ohos:router";
class UnitConverterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputValue = new ObservedPropertySimplePU('1', this, "inputValue");
        this.__outputValue = new ObservedPropertySimplePU('', this, "outputValue");
        this.__selectedCategory = new ObservedPropertySimplePU(UnitCategory.LENGTH, this, "selectedCategory");
        this.__fromUnit = new ObservedPropertySimplePU('m', this, "fromUnit");
        this.__toUnit = new ObservedPropertySimplePU('km', this, "toUnit");
        this.__currentTheme = new ObservedPropertySimplePU(ThemeType.LIGHT, this, "currentTheme");
        this.__availableUnits = new ObservedPropertyObjectPU(new Map(), this, "availableUnits");
        this.unitConverter = UnitConverterUtil;
        this.themeManager = ThemeManagerUtil;
        this.categories = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UnitConverterPage_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.outputValue !== undefined) {
            this.outputValue = params.outputValue;
        }
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.fromUnit !== undefined) {
            this.fromUnit = params.fromUnit;
        }
        if (params.toUnit !== undefined) {
            this.toUnit = params.toUnit;
        }
        if (params.currentTheme !== undefined) {
            this.currentTheme = params.currentTheme;
        }
        if (params.availableUnits !== undefined) {
            this.availableUnits = params.availableUnits;
        }
        if (params.unitConverter !== undefined) {
            this.unitConverter = params.unitConverter;
        }
        if (params.themeManager !== undefined) {
            this.themeManager = params.themeManager;
        }
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
    }
    updateStateVars(params: UnitConverterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__outputValue.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__fromUnit.purgeDependencyOnElmtId(rmElmtId);
        this.__toUnit.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTheme.purgeDependencyOnElmtId(rmElmtId);
        this.__availableUnits.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__outputValue.aboutToBeDeleted();
        this.__selectedCategory.aboutToBeDeleted();
        this.__fromUnit.aboutToBeDeleted();
        this.__toUnit.aboutToBeDeleted();
        this.__currentTheme.aboutToBeDeleted();
        this.__availableUnits.aboutToBeDeleted();
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
    private __outputValue: ObservedPropertySimplePU<string>;
    get outputValue() {
        return this.__outputValue.get();
    }
    set outputValue(newValue: string) {
        this.__outputValue.set(newValue);
    }
    private __selectedCategory: ObservedPropertySimplePU<UnitCategory>;
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: UnitCategory) {
        this.__selectedCategory.set(newValue);
    }
    private __fromUnit: ObservedPropertySimplePU<string>;
    get fromUnit() {
        return this.__fromUnit.get();
    }
    set fromUnit(newValue: string) {
        this.__fromUnit.set(newValue);
    }
    private __toUnit: ObservedPropertySimplePU<string>;
    get toUnit() {
        return this.__toUnit.get();
    }
    set toUnit(newValue: string) {
        this.__toUnit.set(newValue);
    }
    private __currentTheme: ObservedPropertySimplePU<ThemeType>;
    get currentTheme() {
        return this.__currentTheme.get();
    }
    set currentTheme(newValue: ThemeType) {
        this.__currentTheme.set(newValue);
    }
    private __availableUnits: ObservedPropertyObjectPU<Map<string, UnitItem>>;
    get availableUnits() {
        return this.__availableUnits.get();
    }
    set availableUnits(newValue: Map<string, UnitItem>) {
        this.__availableUnits.set(newValue);
    }
    private unitConverter;
    private themeManager;
    private categories: UnitCategory[];
    aboutToAppear() {
        this.currentTheme = this.themeManager.getCurrentTheme();
        this.categories = this.unitConverter.getAllCategories();
        this.loadUnits();
        this.convert();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(this.themeManager.getBackgroundColor());
        }, Column);
        // Top navigation bar
        this.NavigationBar.bind(this)();
        // Category selector
        this.CategorySelector.bind(this)();
        // Input area
        this.InputArea.bind(this)();
        // Unit selectors
        this.UnitSelectors.bind(this)();
        // Result display
        this.ResultDisplay.bind(this)();
        // Quick conversion buttons
        this.QuickConvertButtons.bind(this)();
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
            Text.fontColor(this.themeManager.getTextColor());
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('单位转换');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.themeManager.getTextColor());
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(40);
        }, Blank);
        Blank.pop();
        Row.pop();
    }
    /**
     * Category selector component
     */
    CategorySelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
            Scroll.height(60);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const category = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(category);
                    Button.height(36);
                    Button.fontSize(14);
                    Button.fontColor(this.selectedCategory === category ? Color.White : this.themeManager.getTextColor());
                    Button.backgroundColor(this.selectedCategory === category ?
                        this.themeManager.getScientificButtonColor() :
                        this.themeManager.getButtonBackgroundColor());
                    Button.borderRadius(18);
                    Button.margin({ right: 8 });
                    Button.onClick(() => this.selectCategory(category));
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.categories, forEachItemGenFunction, (category: UnitCategory) => category, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    /**
     * Input area component
     */
    InputArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 20, right: 20, top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.inputValue });
            TextInput.width('100%');
            TextInput.height(60);
            TextInput.fontSize(32);
            TextInput.fontColor(this.themeManager.getTextColor());
            TextInput.backgroundColor(this.themeManager.getInputBackgroundColor());
            TextInput.borderRadius(12);
            TextInput.textAlign(TextAlign.Center);
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => {
                this.inputValue = value;
                this.convert();
            });
        }, TextInput);
        Column.pop();
    }
    /**
     * Unit selectors component
     */
    UnitSelectors(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 20, right: 20, top: 16 });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // From unit selector
            Column.create();
            // From unit selector
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('从');
            Text.fontSize(12);
            Text.fontColor('#888888');
        }, Text);
        Text.pop();
        this.UnitDropdown.bind(this)(true);
        // From unit selector
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Swap button
            Button.createWithChild({ type: ButtonType.Circle });
            // Swap button
            Button.width(50);
            // Swap button
            Button.height(50);
            // Swap button
            Button.backgroundColor(this.themeManager.getOperatorButtonColor());
            // Swap button
            Button.onClick(() => this.swapUnits());
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⇄');
            Text.fontSize(24);
            Text.fontColor(this.themeManager.getTextColor());
        }, Text);
        Text.pop();
        // Swap button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // To unit selector
            Column.create();
            // To unit selector
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('到');
            Text.fontSize(12);
            Text.fontColor('#888888');
        }, Text);
        Text.pop();
        this.UnitDropdown.bind(this)(false);
        // To unit selector
        Column.pop();
        Row.pop();
    }
    /**
     * Unit dropdown component
     */
    UnitDropdown(isFrom: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create(this.getUnitOptions());
            Select.width('90%');
            Select.height(50);
            Select.selected(this.getSelectedIndex(isFrom));
            Select.value(isFrom ? this.fromUnit : this.toUnit);
            Select.fontColor(this.themeManager.getTextColor());
            Select.onSelect((index: number) => {
                const units = Array.from(this.availableUnits.keys());
                if (isFrom) {
                    this.fromUnit = units[index];
                }
                else {
                    this.toUnit = units[index];
                }
                this.convert();
            });
        }, Select);
        Select.pop();
    }
    /**
     * Result display component
     */
    ResultDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(120);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.outputValue);
            Text.fontSize(36);
            Text.fontColor(this.themeManager.getScientificButtonColor());
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.inputValue} ${this.getUnitSymbol(this.fromUnit)} = ${this.outputValue} ${this.getUnitSymbol(this.toUnit)}`);
            Text.fontSize(14);
            Text.fontColor('#888888');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    /**
     * Quick conversion buttons
     */
    QuickConvertButtons(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 20, right: 20, bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('常用转换');
            Text.fontSize(16);
            Text.fontColor(this.themeManager.getTextColor());
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.rowsTemplate('1fr 1fr');
            Grid.width('100%');
            Grid.height(120);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel(item[0]);
                            Button.width('90%');
                            Button.height(40);
                            Button.fontSize(14);
                            Button.fontColor(this.themeManager.getTextColor());
                            Button.backgroundColor(this.themeManager.getButtonBackgroundColor());
                            Button.borderRadius(8);
                            Button.onClick(() => this.applyQuickConversion(item[1], item[2]));
                        }, Button);
                        Button.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.getQuickConversions(), forEachItemGenFunction, (item: string[]) => item[0], false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
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
        const result: ConversionResult = this.unitConverter.convert(value, this.fromUnit, this.toUnit, this.selectedCategory);
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "UnitConverterPage";
    }
}
registerNamedRoute(() => new UnitConverterPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/UnitConverterPage", pageFullPath: "entry/src/main/ets/pages/UnitConverterPage", integratedHsp: "false", moduleType: "followWithHap" });
