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
 
import { LengthMetrics } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { CustomButton } from '../../common/CommonComponents';
import Logger from '../../common/Logger';
import { StatusBar } from '../../common/StatusBar';
import { showError } from '../../common/Utils';
import { UIContextSelf } from '../customScan/model/UIContextSelf';

const TAG = 'Default Scan';

@Entry
@Component
struct DefaultScan {
  @State translateWidth: number = 1;
  @State translateHeight: number = 1;

  build() {
    RelativeContainer() {
      StatusBar()
      Column() {
        CustomButton({
          mText: $r('app.string.default_view_decode'), mOnClick: () => {
            try {
              scanBarcode.startScanForResult(UIContextSelf.getHostContext(), {
                scanTypes: [scanCore.ScanType.ALL],
                enableMultiMode: true,
                enableAlbum: true
              }).then((result: scanBarcode.ScanResult) => {
                Logger.info(TAG, `Promise scan result: ${JSON.stringify(result)}`);
                UIContextSelf.pushUrl({
                  url: 'pages/resultPage/ResultPage',
                  params: {
                    originalValue: result.originalValue,
                    scanType: result.scanType,
                    isGS1: result.isGS1,
                    source: result.source
                  }
                })
              }).catch((error: BusinessError) => {
                if (error.code === scanCore.ScanErrorCode.SCAN_SERVICE_CANCELED) {
                  Logger.info(TAG, 'Disabling the Scanning Service.');
                } else {
                  Logger.error(TAG,
                    `Failed to start the scanning service. Code: ${error.code}, message: ${error.message}.`);
                  showError(error);
                }
              });
            } catch (error) {
              Logger.error(TAG,
                `Failed to start the scanning service. Code: ${error?.code}, message: ${error?.message}.`);
              showError(error);
            }
          }
        })
      }
      .alignItems(HorizontalAlign.Center)
      .width('100%')
      .alignRules({
        top: { anchor: '__container__', align: VerticalAlign.Center },
        left: { anchor: '__container__', align: HorizontalAlign.Center }
      })
      .markAnchor({
        top: LengthMetrics.vp(this.translateHeight),
        start: LengthMetrics.vp(this.translateWidth),
      })
      .onSizeChange((_: SizeOptions, newValue: SizeOptions) => {
        if (newValue && typeof newValue.width === 'number' && typeof newValue.height === 'number') {
          this.translateWidth = newValue.width / 2;
          this.translateHeight = newValue.height / 2;
        }
      })
      .id('columnDefaultScan')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('white')
  }
}