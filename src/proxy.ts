const objectProxyTrap = {
  get(target: any, key: string) {
    return target.$mobx.get(key)
  },
  set(target: any, key: string, value: any) {
    if (key === '$mobx') {
      return Reflect.set(target, key, value)
    }
    return target.$mobx.set(key, value)
  },
}

export function observableProxy(target: any) {
  const proxy = new Proxy(target, objectProxyTrap)
  return proxy
}
