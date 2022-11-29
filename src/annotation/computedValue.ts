export const computedValueAnnotation = {
  name: 'COMPUTEDVALUE',
  extend(key, value, adm, target) {
    const descriptor = Object.getOwnPropertyDescriptor(target, key)!
    adm.defineComputedProperty(key, descriptor.get)
  },
}
