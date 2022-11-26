import { observableProxy } from './proxy'
import { ObservableValue } from './observableValue'

export class ObservableObjectAdm {
  values = new Map<string, ObservableValue>()
  target = null
  proxy
  $adm = true
  constructor(target: any) {
    this.proxy = target
  }

  get(key: string) {
    return this.values.get(key)?.get()
  }

  set(key: string, value: any) {
    const observalbValue = this.values.get(key)
    const oldValue = observalbValue.get()
    if (oldValue !== value) {
      observalbValue.set(value)
    }
  }

  defineProperty(key: string, annotation: any, value) {
    const target = this.proxy
    const discriptor = {
      configmable: true,
      enum: true,
      get: () => {
        this.get(key)
      },
      set: (val: any) => {
        this.set(key, val)
      },
    }
    Object.defineProperty(target, key, discriptor)
    this.values.set(key, value)
  }
}

export const generatorObservable = (target: any): ObservableObjectAdm => {
  if (target.adm) {
    return target
  }
  const proxy = observableProxy(target)
  const adm = new ObservableObjectAdm(proxy)
  proxy.adm = adm
  return adm
}
