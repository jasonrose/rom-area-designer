import reactor from './reactor'
import actionTypes from './action-types'
import getters from './getters'

export default {
  selectToolbarTab(areaName) {
    reactor.dispatch(actionTypes.TOOLBAR_TAB_SELECTED, { areaName: areaName })
  },

  selectRoom(roomId) {
    reactor.dispatch(actionTypes.ROOM_SELECTED, roomId)
    if(roomId !== null) {
      const rooms = reactor.evaluate(getters.rooms).get('rooms')
      const room = rooms.find(room => room.get('id') === roomId)
      reactor.dispatch(actionTypes.SELECT_FLOOR, room.get('coordinates').get(2))
    }
  },

  addRoom(roomId, direction) {
    reactor.dispatch(actionTypes.ADD_ROOM, {roomId, direction})
    const rooms = reactor.evaluate(getters.rooms).get('rooms')
    const coordinates = rooms.last().get('coordinates')
    reactor.dispatch(actionTypes.SELECT_FLOOR, coordinates.get(2))
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

  toggleDoor(roomId, direction) {
    reactor.dispatch(actionTypes.TOGGLE_DOOR, {roomId, direction})
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
  },

  doExport() {
    const state = reactor.serialize()
    const tab = window.open(`data:text/json,${encodeURIComponent(JSON.stringify(state, null, 2))}`, '_blank')
    tab.focus()
  },

  doImport() {
    reactor.dispatch(actionTypes.IMPORT)
  },

  cancelImport() {
    reactor.dispatch(actionTypes.CANCEL_IMPORT)
  },

  finishImport(jsonStr) {
    reactor.dispatch(actionTypes.FINISH_IMPORT, JSON.parse(jsonStr))
  },

  startRoomEditor() {
    reactor.dispatch(actionTypes.START_ROOM_EDITOR)
  },

  cancelRoomEditor() {
    reactor.dispatch(actionTypes.CANCEL_ROOM_EDITOR)
  },

  finishRoomEditor(state) {
    reactor.dispatch(actionTypes.FINISH_ROOM_EDITOR, state)
  },

  selectFloor(floor) {
    reactor.dispatch(actionTypes.SELECT_FLOOR, floor)
  }
}
