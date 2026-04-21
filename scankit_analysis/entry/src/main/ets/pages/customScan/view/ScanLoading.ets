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
 
import { BreakpointConstants } from '../constants/BreakpointConstants';
import { CommonConstants } from '../constants/CommonConstants';
import { BreakpointType } from '../model/BreakpointType';
import { ScanLayout } from '../model/ScanLayout';

const LOADING_OFFSET_Y: number = -36;

@Extend(LoadingProgress)
function loadingIcon() {
  .color($r('sys.color.ohos_id_color_progress'))
  .width(72)
  .height(72)
}

@Extend(Text)
function loadingText() {
  .fontFamily('HarmonyHeiTi')
  .fontSize($r('sys.float.Body_M'))
  .fontWeight(FontWeight.Regular)
  .textAlign(TextAlign.Center)
  .fontColor($r('sys.color.ohos_id_color_text_secondary_dark'))
  .lineHeight(19)
  .margin({
    top: 16
  })
}

@Component
export struct ScanLoading {
  @State scanLayout: ScanLayout = ScanLayout.getInstance();

  build() {
    Column() {
      Column() {
        LoadingProgress().loadingIcon()
        Text($r('app.string.Scan_album_loading')).loadingText()
          .maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_SYMBOL_TEXT)
      }
      .height(new BreakpointType(BreakpointConstants.LOADING_HEIGHT_SM,
        BreakpointConstants.LOADING_HEIGHT_MD,
        BreakpointConstants.LOADING_HEIGHT_LG).getValue(this.scanLayout.widthBreakpoint))
      .offset({
        y: LOADING_OFFSET_Y
      })
    }
    .justifyContent(FlexAlign.End)
    .width('100%')
    .height('100%')
    .backgroundColor(Color.Black)
  }
}