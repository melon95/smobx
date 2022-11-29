import {
  makeObservable,
  observable,
  actionBound,
  autoRun,
  computed,
} from './src/index.js'

const observableValue = makeObservable(
  {
    a: 'i am a string',
    b() {
      this.a = 'i am a new string'
    },
    get c() {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return this.a + '1'
    },
  },
  {
    a: observable,
    b: actionBound,
    c: computed,
  }
)
// console.log(observableValue.a)

autoRun(() => {
  console.log('autorun：', observableValue.c)
})

// observableValue.b()

observableValue.a = 'change in outside'
