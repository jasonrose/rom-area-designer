import { Store, toImmutable } from 'nuclear-js'
import actions from './action-types'

export default Store({
  getInitialState() {
    return toImmutable({
      author: null,
      maximumLevel: 101,
      minimumLevel: 1,
      name: null
    })
  },

  initialize() {
    this.on(actions.SET_AREA_AUTHOR, setAuthor)
    this.on(actions.SET_AREA_MAXIMUM_LEVEL, setMaximumLevel)
    this.on(actions.SET_AREA_MINIMUM_LEVEL, setMinimumLevel)
    this.on(actions.SET_AREA_NAME, setName)
  }
})

function setAuthor(state, name) {
  return state.set('author', name)
}

function setMaximumLevel(state, level) {
  return state.set('maximumLevel', level)
}

function setMinimumLevel(state, level) {
  return state.set('minimumLevel', level)
}

function setName(state, name) {
  return state.set('name', name)
}
