import {
  makeObservable,
  observable,
  actionBound,
  autoRun,
} from './src/index.js'

const observableValue = makeObservable(
  {
    a: 'i am a string',
    b() {
      this.a = 'i am a new string'
    },
    c: true,
  },
  {
    a: observable,
    b: actionBound,
  }
)
// console.log(observableValue.a)

autoRun(() => {
  console.log('autorun：', observableValue.a)
})

// observableValue.b()

observableValue.a = 'change in outside'
