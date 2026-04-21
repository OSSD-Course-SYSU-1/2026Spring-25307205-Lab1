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
 
import { CustomButton } from '../common/CommonComponents'
import { UIContextSelf } from './customScan/model/UIContextSelf';

@Entry
@Component
struct Index {
  private scroller: Scroller = new Scroller();

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Text($r('app.string.demo_title'))
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor($r('sys.color.black'))

      Column() {
        Text($r('app.string.demo_subject'))
          .margin({
            top: 24,
          })
          .fontSize(24)
          .textAlign(TextAlign.Center)
          .fontColor($r('sys.color.black'))
        Text($r('app.string.demo_detail'))
          .margin({
            top: 16,
            left: 24,
            right: 24,
            bottom: 20,
          })
          .fontSize(18)
          .fontColor($r('sys.color.mask_secondary'))
      }
      .backgroundColor('#0a000000')
      .borderRadius(12)
      .margin({
        top: 45,
        bottom: 20,
        right: 20,
        left: 20
      })

      Column() {
        Scroll(this.scroller) {
          Column() {
            CustomButton({
              mText: $r('app.string.default_view_decode'), mOnClick: () => {
                UIContextSelf.pushUrl({
                  url: 'pages/defaultScan/DefaultScan'
                })
              }
            })

            CustomButton({
              mText: $r('app.string.customized_view_decode'), mOnClick: () => {
                UIContextSelf.pushUrl({
                  url: 'pages/customScan/CustomPage'
                })
              }
            })

            CustomButton({
              mText: $r('app.string.bitmap_api_decode'), mOnClick: () => {
                UIContextSelf.pushUrl({
                  url: "pages/detectBarcode/DecodeBarcode"
                })
              }
            })

            CustomButton({
              mText: $r('app.string.generate_QR_code'), mOnClick: () => {
                UIContextSelf.pushUrl({
                  url: 'pages/generateBarcode/CreateBarcode',
                })
              }
            })
          }
        }
        .width('90%')
        .scrollBar(BarState.Off)
        .scrollable(ScrollDirection.Vertical)
      }
      .margin({
        top: 50,
        bottom: 10
      })
      .height(250)
    }
    .width('100%')
  }
}