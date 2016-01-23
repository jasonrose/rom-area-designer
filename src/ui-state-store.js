import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './action-types'

export default Store({
  getInitialState() {
    return toImmutable({
      selectedToolbarTab: 'area-tab'
    })
  },

  initialize() {
    this.on(actionTypes.TOOLBAR_TAB_SELECTED, toolbarTabSelected)
  }
})

function toolbarTabSelected(state, { areaName }) {
  return state.set('selectedToolbarTab', areaName)
}
