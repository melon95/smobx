const globalState = {
  batch: 0,
}

export function startBatch() {
  globalState.batch++
}

export function endBatch() {
  globalState.batch--
}
