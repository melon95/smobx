import { observableProxy } from '../proxy.js'
import { ObservableValue } from './observableValue.js'
import { ComputedValue } from './computedValue.js'

export class ObservableObjectAdm {
  values = new Map<string, ObservableValue>()
  target
  proxy
  constructor(target: any) {
    this.target = target
  }

  get(key: string) {
    // 如果没有定义注解的字段则不会被defineProperty监听get和set，从而会直接取原始值
    return this.target[key]
  }

  set(key: string, value: any) {
    this.target[key] = value
    return true
  }

  defineProperty(key: string, value) {
    const target = this.target
    const discriptor = {
      configmable: true,
      enum: true,
      writable: false,
      value,
    }
    Object.defineProperty(target, key, discriptor)
  }

  defineObservableProperty(key, value) {
    const target = this.target
    const discriptor = {
      configmable: true,
      enum: true,
      get: () => {
        return this.getObservablePropValue(key)
      },
      set: (val: any) => {
        this.setObservablePropValue(key, val)
      },
    }
    Object.defineProperty(target, key, discriptor)
    this.values.set(key, new ObservableValue(value))
  }

  defineComputedProperty(key, value) {
    const target = this.target
    const discriptor = {
      configmable: true,
      enum: true,
      get: () => {
        return this.getObservablePropValue(key)
      },
    }
    Object.defineProperty(target, key, discriptor)
    this.values.set(
      key,
      new ComputedValue(value, this.proxy) as unknown as ObservableValue
    )
  }

  getObservablePropValue(key) {
    return this.values.get(key)!.get()
  }

  setObservablePropValue(key: string, value) {
    this.values.get(key)!.set(value)
  }
}

export interface IIsObservableObject {
  $mobx: any
}

/**
 * 1. 创建adm对象
 * 2. 关联adm对象和proxy对象
 */
export const generatorObservable = (target: any): IIsObservableObject => {
  if (target.$mobx) {
    return target
  }
  const adm = new ObservableObjectAdm(target)
  target.$mobx = adm
  target.$mobx.proxy = observableProxy(target)
  return target
}
