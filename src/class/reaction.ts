import { globalState, startBatch, endBatch } from '../tools/index.js'
let reactionId = 0
export class Reaction {
  observer = new Set()
  id = reactionId++
  cb
  constructor(cb) {
    this.cb = cb
  }

  scheduler() {
    runReaction(this)
  }

  track() {
    startBatch()
    const pre = globalState.reaction
    globalState.reaction = this
    this.cb()
    globalState.reaction = pre
    endBatch()
  }
}

export function runReaction(reaction: Reaction) {
  if (globalState.batch > 0) {
    globalState.pendingReactions.push(reaction)
    return
  }
  reaction.track()
}

export function autoRun(cb) {
  const reaction = new Reaction(cb)
  reaction.scheduler()
}
