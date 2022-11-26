export class ObservableValue {
  value
  observing = new Set()
  constructor(value) {
    this.value = value
  }

  get() {
    this.recordObserving()
    return this.value
  }

  set(value) {
    if (value !== this.value) {
      this.reportChanged()
      this.value = value
    }
  }

  reportChanged() {
    this.observing.forEach((observable) => {})
  }

  recordObserving() {
    // this.observing.add()
  }
}
