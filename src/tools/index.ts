import { Reaction } from '../class/reaction.js'
interface IGlobaState {
  batch: number
  runInfo: any
  pendingReactions: Reaction[]
  reaction: Reaction
}

export const globalState: IGlobaState = {
  batch: 0,
  runInfo: null,
  pendingReactions: [],
  reaction: null as unknown as Reaction,
}

export function startBatch() {
  globalState.batch++
}

export function endBatch() {
  if (--globalState.batch === 0) {
    const reactionList = globalState.pendingReactions.slice()
    globalState.pendingReactions = []
    reactionList.forEach((reaction) => {
      reaction.scheduler()
    })
  }
}
