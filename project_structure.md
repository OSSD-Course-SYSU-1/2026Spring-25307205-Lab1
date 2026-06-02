# HarmonyOS计算器项目结构分析文档

## 一、项目简介

本项目为基于HarmonyOS Stage模型的简易计算器应用，采用ArkTS语言开发，实现加减乘除混合运算功能。项目基于HarmonyOS 5.0.5(17)兼容SDK，目标SDK版本为6.0.2(22)，运行环境为HarmonyOS系统。

**技术栈：**
- 开发语言：ArkTS（TypeScript扩展）
- UI框架：ArkUI声明式开发范式
- 应用模型：Stage模型
- 构建工具：Hvigor

**功能特性：**
- 支持加减乘除四则混合运算
- 实时计算结果显示
- 表达式输入与编辑
- 千分位格式化显示

---

## 二、整体目录拆分

### 2.1 项目根目录结构

```
SimpleCalculator-master/
├── AppScope/                    # 应用全局配置目录
│   └── app.json5                # 应用全局配置文件
├── entry/                       # 主模块（HAP包）
│   ├── src/main/                # 主源码目录
│   ├── build/                   # 构建输出目录
│   ├── build-profile.json5      # 模块构建配置
│   ├── hvigorfile.ts            # 构建脚本
│   └── oh-package.json5         # 模块依赖配置
├── hvigor/                      # Hvigor构建工具配置
├── .hvigor/                     # 构建缓存目录
├── .idea/                       # IDE配置目录
├── screenshots/                 # 项目截图资源
├── build-profile.json5          # 工程级构建配置
├── hvigorfile.ts                # 工程构建脚本
├── oh-package.json5             # 工程依赖配置
└── README.md                    # 项目说明文档
```

### 2.2 entry模块目录拆解

#### 2.2.1 ets源码目录结构

```
entry/src/main/ets/
├── common/                      # 公共模块
│   ├── constants/               # 常量定义
│   │   └── CommonConstants.ets  # 公共常量类（运算符、优先级等）
│   └── util/                    # 工具类
│       ├── CalculateUtil.ets    # 计算逻辑工具类
│       ├── CheckEmptyUtil.ets   # 非空判断工具类
│       └── Logger.ets           # 日志管理工具类
├── entryability/                # 应用入口
│   └── EntryAbility.ts          # Ability生命周期管理
├── pages/                       # 页面目录
│   └── HomePage.ets             # 计算器主页面
└── viewmodel/                   # 视图模型
    ├── PressKeysItem.ets        # 按键数据模型
    └── PresskeysViewModel.ets   # 按键布局数据模型
```

#### 2.2.2 resources资源目录结构

```
entry/src/main/resources/
├── base/                        # 基础资源（默认资源）
│   ├── element/                 # 元素资源
│   │   ├── color.json           # 颜色资源定义
│   │   ├── float.json           # 尺寸资源定义
│   │   └── string.json          # 字符串资源定义
│   ├── media/                   # 媒体资源
│   │   ├── icon.png             # 应用图标
│   │   ├── ic_add.png           # 加法图标
│   │   ├── ic_min.png           # 减法图标
│   │   ├── ic_mul.png           # 乘法图标
│   │   ├── ic_div.png           # 除法图标
│   │   ├── ic_equ.png           # 等号图标
│   │   ├── ic_clean.png         # 清除图标
│   │   └── ic_del.png           # 删除图标
│   └── profile/                 # 配置文件
│       └── main_pages.json      # 页面路由配置
├── en_US/                       # 英文资源
│   └── element/string.json      # 英文字符串资源
└── zh_CN/                       # 中文资源
    └── element/string.json      # 中文字符串资源
```

---

## 三、核心文件作用

### 3.1 配置文件详解

#### 3.1.1 module.json5（模块配置文件）

**路径：** `entry/src/main/module.json5`

**作用：** 定义HAP模块的基本配置信息，包括模块类型、Ability组件、设备类型等。

**关键配置项：**
```json5
{
  "module": {
    "name": "entry",                    // 模块名称
    "type": "entry",                    // 模块类型（entry表示主模块）
    "mainElement": "EntryAbility",      // 主入口Ability
    "deviceTypes": ["phone"],           // 支持设备类型
    "pages": "$profile:main_pages",     // 页面路由配置引用
    "abilities": [{                     // Ability组件配置
      "name": "EntryAbility",           // Ability名称
      "srcEntry": "./ets/entryability/EntryAbility.ts",  // 入口文件路径
      "exported": true,                 // 是否可被其他应用调用
      "skills": [{                      // Ability技能声明
        "entities": ["entity.system.home"],
        "actions": ["action.system.home"]
      }]
    }]
  }
}
```

#### 3.1.2 build-profile.json5（构建配置文件）

**工程级路径：** `build-profile.json5`

**作用：** 配置工程级构建参数，包括SDK版本、签名配置、产品变体等。

**关键配置项：**
```json5
{
  "app": {
    "products": [{
      "name": "default",
      "targetSdkVersion": "6.0.2(22)",      // 目标SDK版本
      "compatibleSdkVersion": "5.0.5(17)",  // 兼容SDK版本
      "runtimeOS": "HarmonyOS"              // 运行系统
    }]
  },
  "modules": [{
    "name": "entry",                        // 模块名称
    "srcPath": "./entry"                    // 模块路径
  }]
}
```

#### 3.1.3 oh-package.json5（依赖配置文件）

**工程级路径：** `oh-package.json5`

**作用：** 管理项目依赖包和开发依赖，类似于Node.js的package.json。

**关键配置项：**
```json5
{
  "modelVersion": "5.0.5",       // 模型版本
  "name": "simplecalculator",    // 包名称
  "version": "1.0.0",            // 版本号
  "dependencies": {}             // 运行时依赖
}
```

#### 3.1.4 app.json5（应用全局配置）

**路径：** `AppScope/app.json5`

**作用：** 定义应用级全局配置，包括应用标识、版本信息等。

**关键配置项：**
```json5
{
  "app": {
    "bundleName": "com.example.simplecalculator",  // 应用唯一标识
    "vendor": "example",                           // 开发者信息
    "versionCode": 1000000,                        // 版本号（数字）
    "versionName": "1.0.0",                        // 版本名（字符串）
    "icon": "$media:app_icon",                     // 应用图标
    "label": "$string:app_name"                    // 应用名称
  }
}
```

#### 3.1.5 main_pages.json（页面路由配置）

**路径：** `entry/src/main/resources/base/profile/main_pages.json`

**作用：** 声明应用包含的页面路由，实现页面跳转管理。

**配置内容：**
```json
{
  "src": ["pages/HomePage"]  // 页面路径数组
}
```

### 3.2 核心源码文件作用

#### 3.2.1 EntryAbility.ts（应用入口）

**路径：** `entry/src/main/ets/entryability/EntryAbility.ts`

**作用：** 应用生命周期管理，负责应用启动、窗口创建、前后台切换等核心流程。

**核心方法：**
- `onCreate()`：Ability创建时调用，初始化应用
- `onWindowStageCreate()`：窗口阶段创建，加载主页面
- `onForeground()`：应用进入前台
- `onBackground()`：应用进入后台

**【拓展点】自由流转功能预留位置：**
```typescript
onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
  // TODO: 预留分布式流转初始化代码位置
  // 可在此添加分布式设备管理、跨设备迁移等逻辑
  hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
}

onForeground() {
  // TODO: 预留前台切换时的业务逻辑
  // 可在此添加数据同步、状态恢复等逻辑
  hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
}
```

#### 3.2.2 HomePage.ets（主页面）

**路径：** `entry/src/main/ets/pages/HomePage.ets`

**作用：** 计算器主界面实现，包含UI布局、交互逻辑、计算处理。

**核心功能：**
- UI组件：输入框、结果显示框、键盘布局
- 状态管理：`@State`装饰器管理输入值和计算结果
- 事件处理：数字输入、运算符处理、删除、清除、计算
- 数据格式化：千分位显示、结果格式化

**【拓展点】多端自适应预留位置：**
```typescript
build() {
  Column() {
    // TODO: 预留多设备适配代码位置
    // 可根据设备类型（phone/tablet/TV）调整布局参数
    // 示例：使用媒体查询@media或断点系统实现响应式布局
    
    Column() {
      TextInput({ text: this.resultFormat(this.inputValue) })
        // TODO: 预留不同设备字体大小适配
        .fontSize($r('app.float.font_size_input'))
    }
    .width(CommonConstants.FULL_PERCENT)
    .height($r('app.float.input_height'))
  }
}
```

#### 3.2.3 CommonConstants.ets（公共常量）

**路径：** `entry/src/main/ets/common/constants/CommonConstants.ets`

**作用：** 定义应用全局常量，包括运算符、优先级、显示限制等。

**核心常量：**
- 运算符集合：`OPERATORS = '+-×÷'`
- 优先级枚举：`Priority { HIGH, MEDIUM, LOW }`
- 显示限制：`INPUT_LENGTH_MAX = 9`

#### 3.2.4 CalculateUtil.ets（计算工具类）

**路径：** `entry/src/main/ets/common/util/CalculateUtil.ets`

**作用：** 实现表达式解析和计算逻辑，支持四则混合运算。

**核心方法：**
- `parseExpression()`：解析表达式数组并计算结果
- `isSymbol()`：判断是否为运算符
- `getPriority()`：获取运算符优先级

#### 3.2.5 PressKeysItem.ets（按键数据模型）

**路径：** `entry/src/main/ets/viewmodel/PressKeysItem.ets`

**作用：** 定义计算器按键的数据结构。

**数据模型：**
```typescript
class PressKeysBean {
  flag: number;         // 按键类型标识（0:图标, 1:文字）
  width: string;        // 按键宽度
  height: string;       // 按键高度
  value: string;        // 按键值
  source?: Resource;    // 图标资源（可选）
}
```

#### 3.2.6 PresskeysViewModel.ets（按键视图模型）

**路径：** `entry/src/main/ets/viewmodel/PresskeysViewModel.ets`

**作用：** 提供计算器键盘布局数据，定义按键排列规则。

**核心方法：**
- `getPressKeys()`：返回按键二维数组，定义键盘布局

---

## 四、程序启动运行流程

### 4.1 应用启动流程图

```
应用启动
    ↓
EntryAbility.onCreate()
    ↓
EntryAbility.onWindowStageCreate()
    ↓
windowStage.loadContent('pages/HomePage')
    ↓
HomePage组件初始化
    ↓
HomePage.build() 执行
    ↓
UI渲染完成
    ↓
用户交互（点击按键）
    ↓
事件处理（inputNumber/inputSymbol）
    ↓
CalculateUtil.parseExpression()
    ↓
结果显示更新
```

### 4.2 详细启动流程说明

**阶段1：应用初始化**
1. 系统加载HAP包，解析`module.json5`配置
2. 创建`EntryAbility`实例
3. 调用`onCreate(want, launchParam)`方法，完成应用初始化

**阶段2：窗口创建**
1. 调用`onWindowStageCreate(windowStage)`方法
2. 通过`windowStage.loadContent('pages/HomePage')`加载主页面
3. 获取UIContext并存储到AppStorage供全局访问

**阶段3：页面渲染**
1. 创建`HomePage`组件实例
2. 初始化状态变量：`inputValue`、`calValue`
3. 执行`build()`方法构建UI组件树
4. 渲染输入框、结果显示框、键盘布局

**阶段4：交互处理**
1. 用户点击按键触发`onClick`事件
2. 根据按键类型调用`inputNumber()`或`inputSymbol()`
3. 更新表达式数组`expressions`
4. 调用`CalculateUtil.parseExpression()`计算结果
5. 更新`@State`变量触发UI刷新

### 4.3 Ability生命周期回调顺序

```
onCreate → onWindowStageCreate → onForeground → [运行中] → onBackground → onWindowStageDestroy → onDestroy
```

---

## 五、后续拓展建议

### 5.1 功能拓展点

**1. 科学计算功能**
- 在`HomePage.ets`中扩展键盘布局
- 在`CalculateUtil.ets`中添加三角函数、对数等计算方法

**2. 历史记录功能**
- 创建`HistoryPage.ets`页面
- 使用Preferences API持久化存储计算历史
- 在`main_pages.json`中注册新页面路由

**3. 主题切换功能**
- 在`resources`目录下创建多套颜色资源
- 使用`@StorageLink`实现主题状态共享

### 5.2 多端适配拓展

**1. 平板适配**
- 在`HomePage.ets`中使用断点系统判断设备类型
- 调整键盘布局为更大尺寸
- 优化字体大小和间距

**2. 横屏适配**
- 监听设备方向变化
- 动态调整布局为横向排列

### 5.3 分布式能力拓展

**1. 分布式流转**
- 在`EntryAbility.ts`的`onCreate`中注册分布式回调
- 实现跨设备迁移状态同步

**2. 多设备协同**
- 使用分布式数据管理实现多设备计算同步

---

**文档版本：** v1.0  
**生成日期：** 2026-06-02  
**适用课程：** 软件开发课程项目提交
