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

import HistoryManagerUtil, { HistoryRecord } from '../common/util/HistoryManagerUtil';
import ThemeManagerUtil, { ThemeType } from '../common/util/ThemeManagerUtil';
import router from '@ohos.router';

/**
 * History Record Page
 * Displays calculation history with search and delete functionality
 */
@Entry
@Component
struct HistoryPage {
  @State historyList: HistoryRecord[] = [];
  @State searchKeyword: string = '';
  @State currentTheme: ThemeType = ThemeType.LIGHT;
  @State isLoading: boolean = true;
  private historyManager = HistoryManagerUtil;
  private themeManager = ThemeManagerUtil;

  async aboutToAppear() {
    this.currentTheme = this.themeManager.getCurrentTheme();
    await this.loadHistory();
  }

  build() {
    Column() {
      // Top navigation bar
      this.NavigationBar();
      
      // Search bar
      this.SearchBar();
      
      // History list
      if (this.isLoading) {
        this.LoadingView();
      } else if (this.historyList.length === 0) {
        this.EmptyView();
      } else {
        this.HistoryList();
      }
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

      Text('计算历史')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.themeManager.getTextColor())
        .layoutWeight(1)
        .textAlign(TextAlign.Center)

      Button({ type: ButtonType.Circle }) {
        Text('🗑')
          .fontSize(20)
      }
      .width(40)
      .height(40)
      .backgroundColor(Color.Transparent)
      .onClick(() => this.clearAllHistory())
    }
    .width('100%')
    .height(56)
    .padding({ left: 16, right: 16 })
  }

  /**
   * Search bar component
   */
  @Builder SearchBar() {
    Row() {
      TextInput({ placeholder: '搜索历史记录...', text: this.searchKeyword })
        .width('85%')
        .height(40)
        .backgroundColor(this.themeManager.getInputBackgroundColor())
        .borderRadius(20)
        .padding({ left: 16, right: 16 })
        .onChange((value: string) => {
          this.searchKeyword = value;
          this.searchHistory();
        })
      
      Image($r('app.media.ic_add'))
        .width(24)
        .height(24)
        .margin({ left: 8 })
    }
    .width('100%')
    .height(60)
    .padding({ left: 16, right: 16 })
    .justifyContent(FlexAlign.Start)
  }

  /**
   * Loading view
   */
  @Builder LoadingView() {
    Column() {
      LoadingProgress()
        .width(50)
        .height(50)
        .color(this.themeManager.getScientificButtonColor())
      
      Text('加载中...')
        .fontSize(16)
        .fontColor(this.themeManager.getTextColor())
        .margin({ top: 16 })
    }
    .width('100%')
    .layoutWeight(1)
    .justifyContent(FlexAlign.Center)
  }

  /**
   * Empty view
   */
  @Builder EmptyView() {
    Column() {
      Text('📝')
        .fontSize(60)
      
      Text('暂无历史记录')
        .fontSize(18)
        .fontColor(this.themeManager.getTextColor())
        .margin({ top: 16 })
      
      Text('开始计算后，历史记录将显示在这里')
        .fontSize(14)
        .fontColor('#888888')
        .margin({ top: 8 })
    }
    .width('100%')
    .layoutWeight(1)
    .justifyContent(FlexAlign.Center)
  }

  /**
   * History list component
   */
  @Builder HistoryList() {
    List() {
      ForEach(this.historyList, (item: HistoryRecord) => {
        ListItem() {
          this.HistoryItem(item)
        }
        .swipeAction({ end: this.DeleteButton(item.id) })
      }, (item: HistoryRecord) => item.id)
    }
    .width('100%')
    .layoutWeight(1)
    .padding({ left: 16, right: 16 })
    .divider({ strokeWidth: 1, color: this.themeManager.getBorderColor() })
  }

  /**
   * History item component
   */
  @Builder HistoryItem(item: HistoryRecord) {
    Column() {
      Row() {
        Text(item.expression)
          .fontSize(16)
          .fontColor(this.themeManager.getTextColor())
          .layoutWeight(1)
        
        Text('=')
          .fontSize(16)
          .fontColor('#888888')
          .margin({ left: 8, right: 8 })
        
        Text(item.result)
          .fontSize(18)
          .fontColor(this.themeManager.getScientificButtonColor())
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
      
      Text(this.historyManager.formatTime(item.timestamp))
        .fontSize(12)
        .fontColor('#888888')
        .margin({ top: 4 })
    }
    .width('100%')
    .padding({ top: 12, bottom: 12 })
    .backgroundColor(this.themeManager.getHistoryItemBackground())
    .borderRadius(8)
    .onClick(() => {
      // Copy result to clipboard
      this.copyToClipboard(item.result);
    })
  }

  /**
   * Delete button for swipe action
   */
  @Builder DeleteButton(id: string) {
    Button() {
      Text('删除')
        .fontColor(Color.White)
        .fontSize(16)
    }
    .width(70)
    .height('100%')
    .backgroundColor('#FF5252')
    .onClick(() => this.deleteHistory(id))
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
    } else {
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
}


