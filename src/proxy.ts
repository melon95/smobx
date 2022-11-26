const objectProxyTrap = {
  get(target: any, key: string) {
    return target.adm.get(key)
  },
  set(target: any, key: string, value: any) {
    return target.adm.set(key, value)
  },
}

export function observableProxy(target: any) {
  const proxy = new Proxy(target, objectProxyTrap)
  return proxy
}
