import { startBatch, endBatch } from './tools/index.js'
import { generatorObservable } from './class/objservableObjectAdm.js'

export function makeObservable(target: any, annotations: any) {
  startBatch()
  // 创建adm对象
  const adm = generatorObservable(target).$mobx
  Object.keys(annotations).forEach((key) => {
    annotations[key].extend(key, target[key], adm, target)
  })
  endBatch()
  return adm.proxy
}
