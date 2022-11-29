import { ObservableObjectAdm } from '../class/objservableObjectAdm.js'
import { globalState, startBatch, endBatch } from '../tools/index.js'

let actionId = 0
function createAction(fn) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const runInfo = {
    id: actionId++,
  }
  return function () {
    startBatch()
    const pre = globalState.runInfo
    globalState.runInfo = runInfo
    fn()
    globalState.runInfo = pre
    endBatch()
  }
}

function extend(key, value, adm: ObservableObjectAdm) {
  if (this.bound) {
    value = value.bind(adm.proxy || adm.target)
  }
  value = createAction(value)
  adm.defineProperty(key, value)
}

export const actionAnnotation = {
  name: 'ACTIONS',
  bound: false,
  extend,
}

export const actionBoundAnnotation = {
  name: 'ACTIONS.BOUND',
  bound: true,
  extend,
}

export function assertAllowChange() {
  if (!globalState.runInfo) {
    // throw new Error('observable value must be change in action')
    console.warn('observable value must be change in action')
  }
}
