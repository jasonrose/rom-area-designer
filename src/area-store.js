import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './action-types'

export default Store({
  getInitialState() {
    return toImmutable({
      version: 1,
      author: null,
      maximumLevel: 101,
      minimumLevel: 1,
      name: null
    })
  },

  initialize() {
    this.on(actionTypes.SET_AREA_AUTHOR, setAuthor)
    this.on(actionTypes.SET_AREA_MAXIMUM_LEVEL, setMaximumLevel)
    this.on(actionTypes.SET_AREA_MINIMUM_LEVEL, setMinimumLevel)
    this.on(actionTypes.SET_AREA_NAME, setName)
    this.on(actionTypes.FINISH_IMPORT, doImport)
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

function doImport(state, json) {
  return toImmutable(json.area)
}
