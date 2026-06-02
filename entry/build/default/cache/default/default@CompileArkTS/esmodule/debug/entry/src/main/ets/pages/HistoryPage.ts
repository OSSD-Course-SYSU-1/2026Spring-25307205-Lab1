if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HistoryPage_Params {
    historyList?: HistoryRecord[];
    searchKeyword?: string;
    currentTheme?: ThemeType;
    isLoading?: boolean;
    historyManager?;
    themeManager?;
}
import HistoryManagerUtil from "@bundle:com.example.simplecalculator/entry/ets/common/util/HistoryManagerUtil";
import type { HistoryRecord } from "@bundle:com.example.simplecalculator/entry/ets/common/util/HistoryManagerUtil";
import ThemeManagerUtil, { ThemeType } from "@bundle:com.example.simplecalculator/entry/ets/common/util/ThemeManagerUtil";
import router from "@ohos:router";
class HistoryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__historyList = new ObservedPropertyObjectPU([], this, "historyList");
        this.__searchKeyword = new ObservedPropertySimplePU('', this, "searchKeyword");
        this.__currentTheme = new ObservedPropertySimplePU(ThemeType.LIGHT, this, "currentTheme");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.historyManager = HistoryManagerUtil;
        this.themeManager = ThemeManagerUtil;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HistoryPage_Params) {
        if (params.historyList !== undefined) {
            this.historyList = params.historyList;
        }
        if (params.searchKeyword !== undefined) {
            this.searchKeyword = params.searchKeyword;
        }
        if (params.currentTheme !== undefined) {
            this.currentTheme = params.currentTheme;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.historyManager !== undefined) {
            this.historyManager = params.historyManager;
        }
        if (params.themeManager !== undefined) {
            this.themeManager = params.themeManager;
        }
    }
    updateStateVars(params: HistoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__historyList.purgeDependencyOnElmtId(rmElmtId);
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTheme.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__historyList.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        this.__currentTheme.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __historyList: ObservedPropertyObjectPU<HistoryRecord[]>;
    get historyList() {
        return this.__historyList.get();
    }
    set historyList(newValue: HistoryRecord[]) {
        this.__historyList.set(newValue);
    }
    private __searchKeyword: ObservedPropertySimplePU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    private __currentTheme: ObservedPropertySimplePU<ThemeType>;
    get currentTheme() {
        return this.__currentTheme.get();
    }
    set currentTheme(newValue: ThemeType) {
        this.__currentTheme.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private historyManager;
    private themeManager;
    async aboutToAppear() {
        this.currentTheme = this.themeManager.getCurrentTheme();
        await this.loadHistory();
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
        // Search bar
        this.SearchBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // History list
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.LoadingView.bind(this)();
                });
            }
            else if (this.historyList.length === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.EmptyView.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.HistoryList.bind(this)();
                });
            }
        }, If);
        If.pop();
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
            Text.create('计算历史');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.themeManager.getTextColor());
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width(40);
            Button.height(40);
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => this.clearAllHistory());
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🗑');
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Button.pop();
        Row.pop();
    }
    /**
     * Search bar component
     */
    SearchBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(60);
            Row.padding({ left: 16, right: 16 });
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '搜索历史记录...', text: this.searchKeyword });
            TextInput.width('85%');
            TextInput.height(40);
            TextInput.backgroundColor(this.themeManager.getInputBackgroundColor());
            TextInput.borderRadius(20);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.onChange((value: string) => {
                this.searchKeyword = value;
                this.searchHistory();
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.margin({ left: 8 });
        }, Image);
        Row.pop();
    }
    /**
     * Loading view
     */
    LoadingView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.width(50);
            LoadingProgress.height(50);
            LoadingProgress.color(this.themeManager.getScientificButtonColor());
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('加载中...');
            Text.fontSize(16);
            Text.fontColor(this.themeManager.getTextColor());
            Text.margin({ top: 16 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    /**
     * Empty view
     */
    EmptyView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📝');
            Text.fontSize(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('暂无历史记录');
            Text.fontSize(18);
            Text.fontColor(this.themeManager.getTextColor());
            Text.margin({ top: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('开始计算后，历史记录将显示在这里');
            Text.fontSize(14);
            Text.fontColor('#888888');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    /**
     * History list component
     */
    HistoryList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width('100%');
            List.layoutWeight(1);
            List.padding({ left: 16, right: 16 });
            List.divider({ strokeWidth: 1, color: this.themeManager.getBorderColor() });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.swipeAction({ end: this.DeleteButton.bind(this, item.id) });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.HistoryItem.bind(this)(item);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.historyList, forEachItemGenFunction, (item: HistoryRecord) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    /**
     * History item component
     */
    HistoryItem(item: HistoryRecord, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 12, bottom: 12 });
            Column.backgroundColor(this.themeManager.getHistoryItemBackground());
            Column.borderRadius(8);
            Column.onClick(() => {
                // Copy result to clipboard
                this.copyToClipboard(item.result);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.expression);
            Text.fontSize(16);
            Text.fontColor(this.themeManager.getTextColor());
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('=');
            Text.fontSize(16);
            Text.fontColor('#888888');
            Text.margin({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.result);
            Text.fontSize(18);
            Text.fontColor(this.themeManager.getScientificButtonColor());
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.historyManager.formatTime(item.timestamp));
            Text.fontSize(12);
            Text.fontColor('#888888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    /**
     * Delete button for swipe action
     */
    DeleteButton(id: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(70);
            Button.height('100%');
            Button.backgroundColor('#FF5252');
            Button.onClick(() => this.deleteHistory(id));
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('删除');
            Text.fontColor(Color.White);
            Text.fontSize(16);
        }, Text);
        Text.pop();
        Button.pop();
    }
    /**
     * Load history records
     */
    private async loadHistory() {
        this.isLoading = true;
        this.historyList = await this.historyManager.getHistoryList();
        this.isLoading = false;
    }
    /**
     * Search history records
     */
    private async searchHistory() {
        if (this.searchKeyword.trim() === '') {
            await this.loadHistory();
        }
        else {
            this.historyList = await this.historyManager.searchHistory(this.searchKeyword);
        }
    }
    /**
     * Delete a history record
     */
    private async deleteHistory(id: string) {
        await this.historyManager.deleteHistory(id);
        await this.loadHistory();
    }
    /**
     * Clear all history records
     */
    private async clearAllHistory() {
        await this.historyManager.clearAllHistory();
        await this.loadHistory();
    }
    /**
     * Copy text to clipboard
     */
    private copyToClipboard(text: string) {
        // Clipboard functionality would be implemented here
        // For now, just show a toast message
        console.log('Copied to clipboard: ' + text);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HistoryPage";
    }
}
registerNamedRoute(() => new HistoryPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/HistoryPage", pageFullPath: "entry/src/main/ets/pages/HistoryPage", integratedHsp: "false", moduleType: "followWithHap" });
