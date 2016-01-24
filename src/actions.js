import reactor from './reactor'
import actions from './action-types'

export default {
  selectToolbarTab(areaName) {
    reactor.dispatch(actions.TOOLBAR_TAB_SELECTED, { areaName: areaName })
  },

  changeAreaName(name) {
    reactor.dispatch(actions.SET_AREA_NAME, name)
  },

  changeAreaMinimumLevel(level) {
    reactor.dispatch(actions.SET_AREA_MINIMUM_LEVEL, level)
  },

  changeAreaMaximumLevel(level) {
    reactor.dispatch(actions.SET_AREA_MAXIMUM_LEVEL, level)
  },

  changeAreaAuthor(name) {
    reactor.dispatch(actions.SET_AREA_AUTHOR, name)
  }
}
