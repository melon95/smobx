import { makeObservable } from "./src/makeObservable";

const observableValue = makeObservable({
  a: 'string',
  b: 1,
  c: true
}, {
  a: '1',
  b: '2',
  c: 3
})

console.log(observableValue.a)