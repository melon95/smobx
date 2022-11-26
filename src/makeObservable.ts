import { startBatch, endBatch } from './tools'
import { generatorObservable } from './objservableObjectAdm'

export function makeObservable(target: any, annotations: any) {
  startBatch()
  const adm = generatorObservable(target)
  Object.keys(annotations).forEach((key) => {
    adm.defineProperty(key, annotations[key], target[key])
  })
  endBatch()
  return adm.proxy
}
