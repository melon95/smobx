import { ObservableObjectAdm } from '../class/objservableObjectAdm.js'
export const observableAnnotation = {
  name: 'OBSERVABLE',
  extend(key: string, value: any, adm: ObservableObjectAdm) {
    adm.defineProperty(key, value)
  },
}
