import reactor from './reactor'
import actionTypes from './action-types'

export default {
  selectToolbarTab(areaName) {
    reactor.dispatch(actionTypes.TOOLBAR_TAB_SELECTED, { areaName: areaName })
  },

  selectRoom(roomId) {
    reactor.dispatch(actionTypes.ROOM_SELECTED, roomId)
  },

  addRoom(roomId, direction) {
    reactor.dispatch(actionTypes.ADD_ROOM, {roomId, direction})
  },

  linkRoom(roomId, direction) {
    reactor.dispatch(actionTypes.LINK_ROOM, {roomId, direction})
  },

  unlinkRoom(roomId, direction) {
    reactor.dispatch(actionTypes.UNLINK_ROOM, {roomId, direction})
  },

  removeRoom(room) {
    const roomId = room.get('id')
    room.get('links').forEach((link, direction) => {
      if(link !== null) {
        reactor.dispatch(actionTypes.UNLINK_ROOM, {roomId, direction})
      }
    })
    reactor.dispatch(actionTypes.REMOVE_ROOM, roomId)
  },

  changeAreaName(name) {
    reactor.dispatch(actionTypes.SET_AREA_NAME, name)
  },

  changeAreaMinimumLevel(level) {
    reactor.dispatch(actionTypes.SET_AREA_MINIMUM_LEVEL, level)
  },

  changeAreaMaximumLevel(level) {
    reactor.dispatch(actionTypes.SET_AREA_MAXIMUM_LEVEL, level)
  },

  changeAreaAuthor(name) {
    reactor.dispatch(actionTypes.SET_AREA_AUTHOR, name)
  }
}
