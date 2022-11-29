import { track, startBatch, endBatch, globalState } from '../tools/index.js'
import { Reaction, runReaction } from './reaction.js'

export class ComputedValue {
  value
  // 被reaction观察
  observing = new Set()
  // 使用的可观察的值
  observer = new Set()
  constructor(public getter, public context) {
    this.track()
  }

  get() {
    this.recordObserving()
    return this.value
  }

  onBecomeStale() {
    this.scheduler()
  }

  scheduler() {
    globalState.pendingReactions.push(this as unknown as Reaction)
    runReaction()
  }

  track() {
    const newValue = track(this.computed, this, this)
    if (newValue !== this.value) {
      this.value = newValue
      this.reportChanged()
    }
  }

  computed() {
    return this.getter.call(this.context)
  }

  reportChanged() {
    startBatch()
    this.observing.forEach((reaction: Reaction) => {
      globalState.pendingReactions.push(reaction)
      runReaction()
    })
    endBatch()
  }

  recordObserving() {
    const derivation = globalState.reaction
    derivation.observer.add(this)
    this.observing.add(derivation)
  }
}
