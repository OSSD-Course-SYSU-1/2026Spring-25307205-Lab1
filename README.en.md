# Simple Calculator

### Introduction

Based on basic components and containers, learn how to implement a calculator that supports addition, subtraction, multiplication, and division. Example:

![image](screenshots/device/SimpleCalculator.gif)

### Concepts

- ForEach: a component that performs loop rendering based on array data.
- TextInput: a single-line text box component.
- Image: a component that is used to display images in applications. It supports data sources of the string, PixelMap, and Resource types and supports the PNG, JPG, BMP, SVG, and GIF formats.

### Project Directory
```
│──entry/src/main/ets	                   // Code area
│  ├──common
│  │  ├──constants
│  │  │  └──CommonConstants.ets            // Common constants
│  │  └──util
│  │     ├──CalculateUtil.ets              // Calculation utility
│  │     ├──CheckEmptyUtil.ets             // Non-empty check utility
│  │     └──Logger.ets                     // Logger
│  ├──entryability
│  │  └──EntryAbility.ts	               // Application entry
│  ├──pages
│  │  └──HomePage.ets                      // Calculator page
│  └──viewmodel    
│     ├──PressKeysItem.ets                 // Press key item
│     └──PresskeysViewModel.ets            // Calculator keyboard
└──entry/src/main/resource                 // Directory of static application resources
```

### Permissions

N/A

### How to Use

1. Enter an expression in the keyboard input area.
2. The expression text box displays the entered expression in real time.
3. The result output box displays the calculation result of the expression in real time.

### Constraints

1. The sample is only supported on Huawei phones with standard systems.
2. HarmonyOS: HarmonyOS 5.0.5 Release or later.
3. DevEco Studio: DevEco Studio 6.0.2 Release or later.
4. HarmonyOS SDK: HarmonyOS 6.0.2 Release SDK or later.
