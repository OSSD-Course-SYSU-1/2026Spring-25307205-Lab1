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
 
import { WindowService } from "../pages/customScan/model/WindowService";

@Extend(Text)
function labelText() {
  .fontSize(14).fontColor(0x000000)
  .textAlign(TextAlign.Start)
}

@Extend(Button)
function buttonScanStyle() {
  .backgroundColor($r('sys.color.ohos_id_color_button_normal'))
  .fontColor($r('sys.color.ohos_id_color_text_primary_activated'))
  .align(Alignment.Center)
  .type(ButtonType.Capsule)
  .margin({ bottom: 10 })
}

@Component
export struct CustomButton {
  @Prop mText: string | Resource = '';
  @State windowService: WindowService = WindowService.getInstance();
  private mHeight: number = 40;
  public mOnClick: () => void = () => {
  };

  build() {
    if (this.windowService.width <= 480) {
      Column() {
        Button(this.mText)
          .height(this.mHeight)
          .buttonScanStyle()
          .width('100%')
          .onClick(this.mOnClick)
      }.margin({ right: 16, left: 16 })
    } else {
      Column() {
        Button(this.mText)
          .height(this.mHeight)
          .buttonScanStyle()
          .width(448)
          .onClick(this.mOnClick)
      }
    }
  }
}

@Component
export struct CustomLabel {
  @Prop text: string | Resource = '';

  build() {
    Column() {
      Text(this.text).labelText().width(65)
    }.justifyContent(FlexAlign.Center).height(34)
  }
}

