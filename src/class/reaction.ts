import { globalState, track } from '../tools/index.js'
let reactionId = 0
export class Reaction {
  observer = new Set()
  newObserver = new Set()
  id = reactionId++
  cb
  constructor(cb) {
    this.cb = cb
  }

  onBecomeStale() {
    this.scheduler()
  }

  scheduler() {
    globalState.pendingReactions.push(this)
    runReaction()
  }

  track() {
    return track(this.cb, this, this)
  }
}

export function runReaction() {
  if (globalState.batch > 0) {
    return
  }
  const reactionList = globalState.pendingReactions.slice()
  globalState.pendingReactions = []
  reactionList.forEach((reaction) => {
    reaction.track()
  })
}

export function autoRun(cb) {
  const reaction = new Reaction(cb)
  reaction.scheduler()
}
