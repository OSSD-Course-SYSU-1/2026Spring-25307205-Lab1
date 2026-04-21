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
import { CustomButton } from '../../common/CommonComponents'
import { StatusBar } from '../../common/StatusBar';
import { UIContextSelf } from './model/UIContextSelf';

@Entry
@Component
struct CustomPage {
  @State translateWidth: number = 1;
  @State translateHeight: number = 1;

  build() {
    RelativeContainer() {
      StatusBar()
      Column() {
        CustomButton({
          mText: $r('app.string.customized_view_decode'), mOnClick: () => {
            UIContextSelf.pushUrl({
              url: "pages/customScan/pages/ScanPage"
            })
          }
        })

        CustomButton({
          mText: $r('app.string.customized_view_decode_v2'), mOnClick: () => {
            UIContextSelf.pushUrl({
              url: "pages/customScanV2/pages/ScanPage"
            })
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
      .id('columnCustomPage')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('white')
  }
}