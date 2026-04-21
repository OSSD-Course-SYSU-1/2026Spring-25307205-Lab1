/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
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
 
import { PromptAction, router, Router, window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import Logger from '../../../common/Logger';

const TAG: string = 'UIContextSelf';

export class UIContextSelf {
  public static uiContext: UIContext;

  public static setUIContext(windowObj: window.Window): void {
    if (windowObj) {
      try {
        UIContextSelf.uiContext = windowObj.getUIContext();
        Logger.info(TAG, 'Succeeded in getting getUIContext.');
      } catch (error) {
        Logger.error(TAG, `Failed to get getUIContext by windowObj. Code: ${error?.code}.`);
      }
    } else {
      Logger.error(TAG, 'windowObj is invalid.');
    }
  }

  public static getPromptAction(): PromptAction {
    if (!UIContextSelf.uiContext) {
      throw new Error('UIContext has not been set.');
    }
    return UIContextSelf.uiContext.getPromptAction();
  }

  public static getHostContext(): Context | undefined {
    if (!UIContextSelf.uiContext) {
      throw new Error('UIContext has not been set.');
    }
    return UIContextSelf.uiContext.getHostContext();
  }

  public static getRouter(): Router {
    if (!UIContextSelf.uiContext) {
      throw new Error('UIContext has not been set.');
    }
    return UIContextSelf.uiContext.getRouter();
  }

  public static getSharedLocalStorage(): LocalStorage | undefined {
    if (!UIContextSelf.uiContext) {
      throw new Error('UIContext has not been set.');
    }
    return UIContextSelf.uiContext.getSharedLocalStorage();
  }

  public static async replaceUrl(options: router.RouterOptions): Promise<void> {
    try {
      UIContextSelf.uiContext.getRouter().replaceUrl(options).catch((error: BusinessError) => {
        Logger.error(TAG, `Failed to replaceUrl by getRouter. Code: ${error.code}.`);
      });
    } catch (error) {
      Logger.error(TAG, `Failed to replaceUrl by getRouter. Code: ${error?.code}.`);
    }
  }

  public static async pushUrl(options: router.RouterOptions): Promise<void> {
    try {
      UIContextSelf.uiContext.getRouter().pushUrl(options).catch((error: BusinessError) => {
        Logger.error(TAG, `Failed to pushUrl by getRouter. Code: ${error.code}.`);
      });
    } catch (error) {
      Logger.error(TAG, `Failed to pushUrl by getRouter. Code: ${error?.code}.`);
    }
  }
}