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
import { StatusBar } from '../../common/StatusBar';

@Extend(Text)
function textHead() {
  .width('100%')
  .fontSize(20)
  .fontWeight(FontWeight.Bold)
  .fontColor($r('sys.color.black'))
  .textAlign(TextAlign.Center)
}

@Extend(Text)
function text() {
  .width('100%')
  .textAlign(TextAlign.Start)
  .fontSize(14)
  .lineHeight(20)
}

@Extend(Text)
function textTitle() {
  .width('100%')
  .textAlign(TextAlign.Start)
  .fontSize(16)
  .fontWeight(FontWeight.Bold)
  .margin({ top: 20 })
}

@Entry
@Component
struct ScanDetail {
  @State translateWidth: number = 1;
  @State translateHeight: number = 1;
  @StorageLink('scanLanguage') language: string = 'zh-Hans-CN';

  build() {
    RelativeContainer() {
      StatusBar()
      Column() {
        Text($r('app.string.access_detail_title')).textHead()

        Column() {

          Text($r('app.string.access_detail_info_f'))
            .text()
          Text($r('app.string.access_detail_info_t'))
            .text()

          Text($r('app.string.access_detail_example')).textTitle()
          Text($r('app.string.access_detail_example_f')).text()
          Text($r('app.string.access_detail_example_t'))
            .text()

          Text($r('app.string.access_detail_procedure')).textTitle()
          Text($r('app.string.access_detail_procedure1')).text()
          Text($r('app.string.access_detail_procedure2'))
            .text()
          Text($r('app.string.access_detail_procedure3')).text()
          Text($r('app.string.access_detail_procedure4')).text()

          Text($r('app.string.access_detail_th')).text().margin({ top: 20 }).textAlign(TextAlign.Center)
          Image($rawfile(this.language === 'zh-Hans-CN' ? 'access.jpg' : 'accessEs.jpg'))
            .height(150)

        }
        .margin(10)
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
      .id('columnScanDetail')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('white')
  }
}