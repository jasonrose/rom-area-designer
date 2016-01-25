import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './action-types'

export default Store({
  getInitialState() {
    return toImmutable({
      selectedToolbarTab: 'area-tab',
      isExporting: false,
      isImporting: false,
      isEditingRoom: false
    })
  },

  initialize() {
    this.on(actionTypes.TOOLBAR_TAB_SELECTED, toolbarTabSelected)
    this.on(actionTypes.EXPORT, exportSelected)
    this.on(actionTypes.IMPORT, importSelected)
    this.on(actionTypes.CANCEL_IMPORT, cancelImport)
    this.on(actionTypes.FINISH_IMPORT, cancelImport)
    this.on(actionTypes.START_ROOM_EDITOR, startRoomEditor)
    this.on(actionTypes.CANCEL_ROOM_EDITOR, cancelRoomEditor)
    this.on(actionTypes.FINISH_ROOM_EDITOR, cancelRoomEditor)
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

function startRoomEditor(state) {
  return state.set('isEditingRoom', true)
}

function cancelRoomEditor(state) {
  return state.set('isEditingRoom', false)
}
