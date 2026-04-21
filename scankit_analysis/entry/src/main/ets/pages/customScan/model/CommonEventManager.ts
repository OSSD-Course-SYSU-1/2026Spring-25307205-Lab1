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
 
import { commonEventManager, emitter } from '@kit.BasicServicesKit';
import type { BusinessError } from '@kit.BasicServicesKit';
import { CommonConstants } from '../constants/CommonConstants';
import Logger from '../../../common/Logger';

const TAG = 'Common Event Manager';

export class CommonEventManager {
  private subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
    events: [commonEventManager.Support.COMMON_EVENT_SCREEN_OFF, commonEventManager.Support.COMMON_EVENT_SCREEN_ON]
  }; // Subscriber information
  private subscriber: commonEventManager.CommonEventSubscriber; // Used to save the created subscriber object for subsequent subscription and unsubscription.
  private static instance: CommonEventManager;

  public static getInstance(): CommonEventManager {
    if (!CommonEventManager.instance) {
      CommonEventManager.instance = new CommonEventManager();
    }
    return CommonEventManager.instance;
  }

  // Create a subscriber.
  public createSubscriber(): void {
    try {
      commonEventManager.createSubscriber(this.subscribeInfo, this.createCB.bind(this));
    } catch (error) {
      Logger.error(TAG, `Failed to create subscriber in the createSubscriber method. Code: ${error?.code}`);
    }
  }

  // Callback for subscriber creation.
  private createCB(error: BusinessError, commonEventSubscriber: commonEventManager.CommonEventSubscriber): void {
    if (error) {
      Logger.error(TAG, `Failed to createCB. Code: ${error.code}`);
    } else {
      Logger.info(TAG, `Start to createCB.`);
      this.subscriber = commonEventSubscriber;
      // Subscribe to common events.
      try {
        commonEventManager.subscribe(this.subscriber, this.subscribeCB.bind(this));
      } catch (error) {
        Logger.error(TAG, `Failed to subscribe by commonEventManager. Code: ${error?.code}`);
      }
    }
  }

  // Callback for common event subscription.
  private subscribeCB(error: BusinessError, data: commonEventManager.CommonEventData): void {
    if (error) {
      Logger.error(TAG, `Failed to subscribeCB. Code: ${error.code}`);
    } else {
      Logger.info(TAG, `Start to subscribeCB. Event: ${data.event}.`);
      switch (data.event) {
        case commonEventManager.Support.COMMON_EVENT_SCREEN_OFF:
          Logger.info(TAG, 'Subscribe COMMON_EVENT_SCREEN_OFF.');
          this.notifyScreenEvent(CommonConstants.EVENT_SCREEN_OFF);
          break;
        case commonEventManager.Support.COMMON_EVENT_SCREEN_ON:
          Logger.info(TAG, 'Subscribe COMMON_EVENT_SCREEN_ON.');
          this.notifyScreenEvent(CommonConstants.EVENT_SCREEN_ON);
          break;
        default:
          Logger.info(TAG, 'Other subscription events are not processed.');
      }
    }
  }

  private notifyScreenEvent(isScreenOn: boolean): void {
    let eventData: emitter.EventData = {
      data: {
        'screenEventChange': isScreenOn,
      }
    };
    emitter.emit({
      eventId: CommonConstants.COMMON_EVENT_SCREEN_CHANGE
    }, eventData);
    Logger.info(TAG, 'Send notifications.');
  }

  // Callback for common event unsubscription.
  public unsubscribe(): void {
    try {
      Logger.info(TAG, `Start to unsubscribe.`);
      commonEventManager.unsubscribe(this.subscriber);
    } catch (error) {
      Logger.error(TAG, `Failed to unsubscribe. Code: ${error?.code}`);
    }
  }
}
