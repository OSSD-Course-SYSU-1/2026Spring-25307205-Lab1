import preferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
/**
 * Theme type enumeration
 */
export enum ThemeType {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto"
}
/**
 * Theme color configuration interface
 */
export interface ThemeColors {
    backgroundColor: string | Resource;
    textColor: string | Resource;
    inputBackgroundColor: string | Resource;
    buttonBackgroundColor: string | Resource;
    operatorButtonColor: string | Resource;
    equalsButtonColor: string | Resource;
    borderColor: string | Resource;
    historyItemBackground: string | Resource;
    scientificButtonColor: string | Resource;
}
/**
 * Theme management utility class
 * Provides theme switching and color management
 */
class ThemeManagerUtil {
    private context: common.Context | undefined = undefined;
    private preferencesStore: preferences.Preferences | null = null;
    private readonly STORE_NAME: string = 'CalculatorTheme';
    private currentTheme: ThemeType = ThemeType.LIGHT;
    /**
     * Light theme colors
     */
    private lightTheme: ThemeColors = {
        backgroundColor: '#F5F5F5',
        textColor: '#000000',
        inputBackgroundColor: '#FFFFFF',
        buttonBackgroundColor: '#FFFFFF',
        operatorButtonColor: '#E0E0E0',
        equalsButtonColor: '#4CAF50',
        borderColor: '#E0E0E0',
        historyItemBackground: '#FFFFFF',
        scientificButtonColor: '#2196F3'
    };
    /**
     * Dark theme colors
     */
    private darkTheme: ThemeColors = {
        backgroundColor: '#1A1A1A',
        textColor: '#FFFFFF',
        inputBackgroundColor: '#2D2D2D',
        buttonBackgroundColor: '#3D3D3D',
        operatorButtonColor: '#4D4D4D',
        equalsButtonColor: '#66BB6A',
        borderColor: '#4D4D4D',
        historyItemBackground: '#2D2D2D',
        scientificButtonColor: '#42A5F5'
    };
    /**
     * Initialize theme manager
     * @param context Application context
     */
    async init(context: common.Context): Promise<void> {
        try {
            this.context = context;
            this.preferencesStore = await preferences.getPreferences(context, this.STORE_NAME);
            // Load saved theme preference
            const savedTheme = await this.preferencesStore.get('themeType', ThemeType.LIGHT) as string;
            this.currentTheme = savedTheme as ThemeType;
        }
        catch (error) {
            console.error('ThemeManager init failed: ' + JSON.stringify(error));
        }
    }
    /**
     * Get current theme type
     * @return Current theme type
     */
    getCurrentTheme(): ThemeType {
        return this.currentTheme;
    }
    /**
     * Set theme type
     * @param theme Theme type to set
     */
    async setTheme(theme: ThemeType): Promise<void> {
        this.currentTheme = theme;
        if (this.preferencesStore) {
            try {
                await this.preferencesStore.put('themeType', theme);
                await this.preferencesStore.flush();
            }
            catch (error) {
                console.error('Set theme failed: ' + JSON.stringify(error));
            }
        }
    }
    /**
     * Toggle between light and dark theme
     */
    async toggleTheme(): Promise<void> {
        const newTheme = this.currentTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
        await this.setTheme(newTheme);
    }
    /**
     * Get current theme colors
     * @return Theme colors configuration
     */
    getThemeColors(): ThemeColors {
        if (this.currentTheme === ThemeType.DARK) {
            return this.darkTheme;
        }
        return this.lightTheme;
    }
    /**
     * Check if current theme is dark
     * @return True if dark theme
     */
    isDarkTheme(): boolean {
        return this.currentTheme === ThemeType.DARK;
    }
    /**
     * Get background color
     * @return Background color
     */
    getBackgroundColor(): string | Resource {
        return this.getThemeColors().backgroundColor;
    }
    /**
     * Get text color
     * @return Text color
     */
    getTextColor(): string | Resource {
        return this.getThemeColors().textColor;
    }
    /**
     * Get input background color
     * @return Input background color
     */
    getInputBackgroundColor(): string | Resource {
        return this.getThemeColors().inputBackgroundColor;
    }
    /**
     * Get button background color
     * @return Button background color
     */
    getButtonBackgroundColor(): string | Resource {
        return this.getThemeColors().buttonBackgroundColor;
    }
    /**
     * Get operator button color
     * @return Operator button color
     */
    getOperatorButtonColor(): string | Resource {
        return this.getThemeColors().operatorButtonColor;
    }
    /**
     * Get equals button color
     * @return Equals button color
     */
    getEqualsButtonColor(): string | Resource {
        return this.getThemeColors().equalsButtonColor;
    }
    /**
     * Get border color
     * @return Border color
     */
    getBorderColor(): string | Resource {
        return this.getThemeColors().borderColor;
    }
    /**
     * Get history item background color
     * @return History item background color
     */
    getHistoryItemBackground(): string | Resource {
        return this.getThemeColors().historyItemBackground;
    }
    /**
     * Get scientific button color
     * @return Scientific button color
     */
    getScientificButtonColor(): string | Resource {
        return this.getThemeColors().scientificButtonColor;
    }
}
export default new ThemeManagerUtil();
