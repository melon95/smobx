import { Reaction } from '../class/reaction.js'
interface IGlobaState {
  batch: number
  pendingReactions: Reaction[]
  allowStateChange: boolean
  reaction: Reaction
}

export const globalState: IGlobaState = {
  batch: 0,
  pendingReactions: [],
  allowStateChange: false,
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

export function allowStateChange(val: boolean) {
  const pre = globalState.allowStateChange
  globalState.allowStateChange = val
  return pre
}

export function assertAllowChange() {
  if (!globalState.allowStateChange) {
    // throw new Error('observable value must be change in action')
    console.warn('observable value must be change in action')
  }
}
