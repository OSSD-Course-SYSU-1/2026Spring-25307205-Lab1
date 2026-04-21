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
 
import { bundleManager, common, abilityAccessCtrl, PermissionRequestResult, Permissions } from '@kit.AbilityKit';
import Logger from './Logger';
import { UIContextSelf } from '../pages/customScan/model/UIContextSelf';

const TAG = 'Scan SampleCode PermissionsUtil';
let context = UIContextSelf.getHostContext() as common.UIAbilityContext;

export class PermissionsUtil {
  public static async checkAccessToken(permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
    let atManager = abilityAccessCtrl.createAtManager();
    let grantStatus: abilityAccessCtrl.GrantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;
    // Obtain accessTokenId of the app.
    let tokenId: number = 0;
    try {
      let bundleInfo: bundleManager.BundleInfo = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
      let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
      tokenId = appInfo.accessTokenId;
    } catch (error) {
      Logger.error(TAG, `Failed to get bundle info for self. Code: ${error?.code}.`);
    }
    //  Check whether the app has the required permission.
    try {
      grantStatus = await atManager.checkAccessToken(tokenId, permission);
    } catch (error) {
      Logger.error(TAG, `Failed to check access token. Code: ${error?.code}.`);
    }
    return grantStatus;
  }

  public static async reqPermissionsFromUser(): Promise<number[]> {
    Logger.info(TAG, 'reqPermissionsFromUser start ');
    let atManager = abilityAccessCtrl.createAtManager();
    let grantStatus: PermissionRequestResult = { permissions: [], authResults: [] }
    try {
      grantStatus = await atManager.requestPermissionsFromUser(context, ['ohos.permission.CAMERA']);
    } catch (error) {
      Logger.error(TAG, `Failed to request permissions from user. Code: ${error?.code}.`);
    }
    return grantStatus.authResults;
  }
}
