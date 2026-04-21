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
 
@ObservedV2
export class ConfigStorage {
  @Trace colorMode: number = 0;
  @Trace language: string = 'en';
  private static instance: ConfigStorage | null = null;

  static getInstance(): ConfigStorage {
    if (ConfigStorage.instance === null) {
      ConfigStorage.instance = new ConfigStorage();
    }
    return ConfigStorage.instance;
  }

  public updateConfig(colorMode?: number, language?: string): void {
    this.updateColorMode(colorMode);
    this.updateLanguage(language);
  }

  public updateColorMode(colorMode?: number) {
    if (colorMode !== undefined) {
      this.colorMode = colorMode;
    }
  }

  public updateLanguage(language?: string) {
    if (language !== undefined) {
      this.language = language;
    }
  }
}