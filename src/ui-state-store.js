import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './action-types'

export default Store({
  getInitialState() {
    return toImmutable({
      selectedToolbarTab: 'area-tab',
      isExporting: false,
      isImporting: false
    })
  },

  initialize() {
    this.on(actionTypes.TOOLBAR_TAB_SELECTED, toolbarTabSelected)
    this.on(actionTypes.EXPORT, exportSelected)
    this.on(actionTypes.IMPORT, importSelected)
    this.on(actionTypes.CANCEL_IMPORT, cancelImport)
    this.on(actionTypes.FINISH_IMPORT, finishImport)
  }
})

function toolbarTabSelected(state, { areaName }) {
  return state.set('selectedToolbarTab', areaName)
}

function exportSelected(state) {
  return state.set('isExporting', true)
}

function importSelected(state) {
  return state.set('isImporting', true)
}

function cancelImport(state) {
  return state.set('isImporting', false)
}

function finishImport(state) {
  return state.set('isImporting', false)
}
