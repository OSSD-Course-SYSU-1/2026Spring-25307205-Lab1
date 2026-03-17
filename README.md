
# sorting.py

## 简介

`sorting.py` 是一个Python排序算法实现文件，包含多种常见的排序算法。

## 功能

- **冒泡排序** (Bubble Sort): 简单易理解的排序算法
- **选择排序** (Selection Sort): 通过选择最小元素进行排序
- **插入排序** (Insertion Sort): 逐个插入元素进行排序
- **快速排序** (Quick Sort): 高效的分治排序算法
- **归并排序** (Merge Sort): 稳定的分治排序算法

## 使用方法

```python
from sorting import bubble_sort, quick_sort

data = [64, 34, 25, 12, 22, 11, 90]
result = quick_sort(data)
print(result)
```

## 性能对比

| 算法 | 时间复杂度 | 空间复杂度 |
|------|----------|----------|
| 冒泡排序 | O(n²) | O(1) |
| 快速排序 | O(n log n) | O(log n) |
| 归并排序 | O(n log n) | O(n) |
