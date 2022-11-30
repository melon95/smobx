# 简化版Mobx

只实现最核心的功能，没有考虑边界情况，用于理解 Mobx 的设计

## 功能

- [x] Observable
  - [x] Object
  - [ ] Array
  - [ ] 嵌套转化 Observable
  - [ ] 对更新值进行转化
  
- [x] Computed
- [x] Action
- [x] Reaction

### Observable

**取值的堆栈：**

1. Proxy getter
2. Adm get
3. Defineproperty getter
4. ObservableValue get

**更新值的堆栈：**

1. Proxy setter
2. Adm set
3. DefineProperty setter
4. ObservableValue set

### Action

在 Mobx 中跟 `Observable` 是相似的，唯一的区别就是 `Definproperty getter` 的值是一个被 `action` 包装后的函数

**执行的堆栈**

1. Proxy getter
2. Adm get
3. Defineproperty getter
4. Action

### Reaction

根据 `Observable` 的变化自动、批量、同步的运行
