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
 
import { TipsDialog } from '@kit.ArkUI';
import { common, Want } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { UIContextSelf } from '../pages/customScan/model/UIContextSelf';
import Logger from './Logger';

const TAG: string = 'Common Tips Dialog';

@CustomDialog
export struct CommonTipsDialog {
  dialogController?: CustomDialogController;

  build() {
    TipsDialog({
      title: $r('app.string.Scan_access_not_enabled'),
      content: $r('app.string.Scan_access_tips'),
      primaryButton: {
        value: $r('app.string.Scan_got_it'),
        action: () => {
          this.closeDialog();
        },
      },
      secondaryButton: {
        value: $r('app.string.Scan_settings'),
        action: () => {
          this.openPermissionsInSystemSettings();
        }
      },
    })
  }

  closeDialog(): void {
    Logger.info(TAG, 'Start to close dialog.');
    if (this.dialogController) {
      this.dialogController.close();
      Logger.info(TAG, 'Succeeded in closing dialog.');
    }
  }

  openPermissionsInSystemSettings(): void {
    Logger.info(TAG, 'Start to open permissions in system settings.');
    let context = UIContextSelf.getHostContext() as common.UIAbilityContext;
    // Start the MainAbility of com.huawei.hmos.settings and match the URI of application_info_entry.
    let wantInfo: Want = {
      bundleName: 'com.huawei.hmos.settings',
      abilityName: 'com.huawei.hmos.settings.MainAbility',
      uri: 'application_info_entry',
      parameters: {
        settingsParamBundleName: 'com.example.scanSample'
      }
    };
    try {
      context.startAbility(wantInfo).then(() => {
        Logger.info(TAG, 'Succeeded in starting ability.');
      }).catch((error: BusinessError) => {
        Logger.error(TAG, `Failed to start ability by promise. Code: ${error.code}.`);
      })
    } catch (error) {
      Logger.error(TAG, `Failed to start ability by catch. Code: ${error?.code}.`);
    }

  }
}
