import { Store, toImmutable } from 'nuclear-js'

export default Store({
  getInitialState() {
    return toImmutable({
      name: null,
      minimumLevel: 1,
      maximumLevel: 101,
      author: null
    })
  },

  initialize() {
  }
})
