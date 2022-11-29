import { ObservableObjectAdm } from '../class/objservableObjectAdm.js'
import { startBatch, endBatch, allowStateChange } from '../tools/index.js'

let actionId = 0
function createAction(fn) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function () {
    const runInfo = startAction()
    fn()
    endAction(runInfo)
  }
}

function startAction() {
  startBatch()
  const pre = allowStateChange(true)
  const runInfo = {
    id: actionId++,
    allowStateChange: pre,
  }
  return runInfo
}

function endAction(runInfo) {
  endBatch()
  allowStateChange(runInfo.allowStateChange)
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
