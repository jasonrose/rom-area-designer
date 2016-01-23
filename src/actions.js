import reactor from './reactor'
import actions from './action-types'

export default {
  selectToolbarTab(areaName) {
    reactor.dispatch(actions.TOOLBAR_TAB_SELECTED, { areaName: areaName })
  }
}
