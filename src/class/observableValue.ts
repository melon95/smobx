import {
  endBatch,
  globalState,
  startBatch,
  assertAllowChange,
} from '../tools/index.js'
import { Reaction, runReaction } from '../class/reaction.js'

export class ObservableValue {
  value
  observing = new Set<Reaction>()
  constructor(value) {
    this.value = value
  }

  get() {
    this.recordObserving()
    return this.value
  }

  set(value) {
    assertAllowChange()
    if (value !== this.value) {
      this.value = value
      this.reportChanged()
    }
  }

  reportChanged() {
    startBatch()
    this.observing.forEach((reaction) => {
      globalState.pendingReactions.push(reaction)
      runReaction()
    })
    endBatch()
  }

  recordObserving() {
    const reaction = globalState.reaction
    if (reaction) {
      this.observing.add(reaction)
      reaction.observer.add(this)
    }
  }
}
