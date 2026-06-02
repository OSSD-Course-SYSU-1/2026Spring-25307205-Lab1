import preferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
/**
 * History record data model
 */
export interface HistoryRecord {
    expression: string;
    result: string;
    timestamp: number;
    id: string;
}
/**
 * History record management utility class
 * Provides local persistence storage for calculation history
 */
class HistoryManagerUtil {
    private context: common.Context | undefined = undefined;
    private preferencesStore: preferences.Preferences | null = null;
    private readonly STORE_NAME: string = 'CalculatorHistory';
    private readonly MAX_HISTORY_SIZE: number = 100;
    /**
     * Initialize history manager
     * @param context Application context
     */
    async init(context: common.Context): Promise<void> {
        try {
            this.context = context;
            this.preferencesStore = await preferences.getPreferences(context, this.STORE_NAME);
        }
        catch (error) {
            console.error('HistoryManager init failed: ' + JSON.stringify(error));
        }
    }
    /**
     * Add a new history record
     * @param expression Calculation expression
     * @param result Calculation result
     */
    async addHistory(expression: string, result: string): Promise<void> {
        if (!this.preferencesStore) {
            return;
        }
        try {
            const historyList = await this.getHistoryList();
            const newRecord: HistoryRecord = {
                expression: expression,
                result: result,
                timestamp: Date.now(),
                id: this.generateId()
            };
            // Add new record to the beginning
            historyList.unshift(newRecord);
            // Limit history size
            if (historyList.length > this.MAX_HISTORY_SIZE) {
                historyList.splice(this.MAX_HISTORY_SIZE);
            }
            // Save to preferences
            await this.preferencesStore.put('historyList', JSON.stringify(historyList));
            await this.preferencesStore.flush();
        }
        catch (error) {
            console.error('Add history failed: ' + JSON.stringify(error));
        }
    }
    /**
     * Get all history records
     * @return History record list
     */
    async getHistoryList(): Promise<HistoryRecord[]> {
        if (!this.preferencesStore) {
            return [];
        }
        try {
            const historyStr = await this.preferencesStore.get('historyList', '[]') as string;
            return JSON.parse(historyStr) as HistoryRecord[];
        }
        catch (error) {
            console.error('Get history list failed: ' + JSON.stringify(error));
            return [];
        }
    }
    /**
     * Delete a history record by ID
     * @param id Record ID
     */
    async deleteHistory(id: string): Promise<void> {
        if (!this.preferencesStore) {
            return;
        }
        try {
            const historyList = await this.getHistoryList();
            const index = historyList.findIndex(item => item.id === id);
            if (index !== -1) {
                historyList.splice(index, 1);
                await this.preferencesStore.put('historyList', JSON.stringify(historyList));
                await this.preferencesStore.flush();
            }
        }
        catch (error) {
            console.error('Delete history failed: ' + JSON.stringify(error));
        }
    }
    /**
     * Clear all history records
     */
    async clearAllHistory(): Promise<void> {
        if (!this.preferencesStore) {
            return;
        }
        try {
            await this.preferencesStore.put('historyList', '[]');
            await this.preferencesStore.flush();
        }
        catch (error) {
            console.error('Clear history failed: ' + JSON.stringify(error));
        }
    }
    /**
     * Search history records by keyword
     * @param keyword Search keyword
     * @return Matched history records
     */
    async searchHistory(keyword: string): Promise<HistoryRecord[]> {
        const historyList = await this.getHistoryList();
        if (!keyword || keyword.trim() === '') {
            return historyList;
        }
        return historyList.filter(item => item.expression.includes(keyword) || item.result.includes(keyword));
    }
    /**
     * Get recent history records
     * @param count Number of records to retrieve
     * @return Recent history records
     */
    async getRecentHistory(count: number = 10): Promise<HistoryRecord[]> {
        const historyList = await this.getHistoryList();
        return historyList.slice(0, Math.min(count, historyList.length));
    }
    /**
     * Generate unique ID
     * @return Unique ID string
     */
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    /**
     * Format timestamp to readable string
     * @param timestamp Timestamp
     * @return Formatted time string
     */
    formatTime(timestamp: number): string {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
}
export default new HistoryManagerUtil();
