import { Store, toImmutable } from 'nuclear-js'
import merge from 'lodash.assign'
import actionTypes from './action-types'

let roomIdCounter = 1

const roomDirectionMap = {
  0: 2,
  1: 3,
  2: 0,
  3: 1,
  4: 5,
  5: 4
}

const directionToCoordinates = (coordinates, direction) => {
  const coords = coordinates.toJS()
  switch(direction) {
    case 0: return [coords[0], coords[1] + 1, coords[2]]
    case 1: return [coords[0] + 1, coords[1], coords[2]]
    case 2: return [coords[0], coords[1] - 1, coords[2]]
    case 3: return [coords[0] - 1, coords[1], coords[2]]
    case 4: return [coords[0], coords[1], coords[2] + 1]
    case 5: return [coords[0], coords[1], coords[2] - 1]
  }
}

function makeRoom(defaults) {
  return merge({
    id: 0,
    name: 'New room',
    links: [null, null, null, null, null, null],
    doors: [0, 0, 0, 0, 0, 0],
    coordinates: [0, 0, 0],
    heal: 100,
    mana: 100,
    flags: [],
    sector: 'city'
  }, defaults)
}

function initialState() {
  return toImmutable({
    flags: 'dark fear gods_only heroes_only imp_only indoors law newbies_only nowhere no_gate no_mob no_recall no_summon no_teleport no_trans pet_shop private safe silence solitary'.split(' '),
    rooms: [
      makeRoom({name: 'Your starting room'})
    ],
    sectors: 'air city desert field forest hills inside mountain noswim swim underwater'.split(' '),
    selectedRoomId: null
  })
}

export default Store({
  getInitialState() {
    return initialState()
  },

  initialize() {
    this.on(actionTypes.ROOM_SELECTED, selectRoom)
    this.on(actionTypes.ADD_ROOM, addRoom)
    this.on(actionTypes.LINK_ROOM, linkRoom)
    this.on(actionTypes.UNLINK_ROOM, unlinkRoom)
    this.on(actionTypes.REMOVE_ROOM, removeRoom)
    this.on(actionTypes.TOGGLE_DOOR, toggleDoor)
    this.on(actionTypes.FINISH_IMPORT, doImport)
    this.on(actionTypes.FINISH_ROOM_EDITOR, finishRoomEditor)
  }
})

function selectRoom(state, roomId) {
  return state.set('selectedRoomId', roomId)
}

function addRoom(state, {roomId, direction}) {
  const newRoom = makeRoom({
    id: roomIdCounter++,
    coordinates: directionToCoordinates(state.get('rooms').find(room => room.get('id') === roomId).get('coordinates'), direction)
  })
  newRoom.links[roomDirectionMap[direction]] = roomId
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === roomId)
    , room => room.update('links', links => links.set(direction, newRoom.id))
    )
  })
  state = state.update('rooms', rooms => rooms.push(toImmutable(newRoom)))
  return state.set('selectedRoomId', newRoom.id)
}

function linkRoom(state, {roomId, direction}) {
  const room = state.get('rooms').find(room => room.get('id') === roomId)
  const targetRoomCoordinates = directionToCoordinates(room.get('coordinates'), direction)
  const targetRoom = state.get('rooms').find(room => {
    const coords = room.get('coordinates').toJS()
    return targetRoomCoordinates[0] === coords[0] && targetRoomCoordinates[1] === coords[1] && targetRoomCoordinates[2] === coords[2]
  })
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === roomId)
      , room => room.update('links', links => links.set(direction, targetRoom.get('id')))
    )
  })
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === targetRoom.get('id'))
      , room => room.update('links', links => links.set(roomDirectionMap[direction], roomId))
    )
  })
  return state
}

function unlinkRoom(state, {roomId, direction}) {
  const room = state.get('rooms').find(room => room.get('id') === roomId)
  const targetRoomCoordinates = directionToCoordinates(room.get('coordinates'), direction)
  const targetRoom = state.get('rooms').find(room => {
    const coords = room.get('coordinates').toJS()
    return targetRoomCoordinates[0] === coords[0] && targetRoomCoordinates[1] === coords[1] && targetRoomCoordinates[2] === coords[2]
  })
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === roomId)
      , room => {
        room = room.update('links', links => links.set(direction, null))
        return room.update('doors', doors => doors.set(direction, 0))
      }
    )
  })
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === targetRoom.get('id'))
      , room => {
        const newDirection = roomDirectionMap[direction]
        room = room.update('links', links => links.set(newDirection, null))
        return room.update('doors', doors => doors.set(newDirection, 0))
      }
    )
  })
  return state
}

function removeRoom(state, roomId) {
  const index = state.get('rooms').findIndex(room => room.get('id') === roomId)
  return state.updateIn(['rooms'], rooms => rooms.remove(index))
}

function toggleDoor(state, {roomId, direction}) {
  const room = state.get('rooms').find(room => room.get('id') === roomId)
  const targetRoomCoordinates = directionToCoordinates(room.get('coordinates'), direction)
  const targetRoom = state.get('rooms').find(room => {
    const coords = room.get('coordinates').toJS()
    return targetRoomCoordinates[0] === coords[0] && targetRoomCoordinates[1] === coords[1] && targetRoomCoordinates[2] === coords[2]
  })
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === roomId)
      , room => room.updateIn(['doors', direction], door => (door + 1) % 3)
    )
  })
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === targetRoom.get('id'))
      , room => room.updateIn(['doors', roomDirectionMap[direction]], door => (door + 1) % 3)
    )
  })
  return state
}

function doImport(state, json) {
  roomIdCounter = json.rooms.rooms.reduce(((acc, room) => room.id > acc ? room.id : acc), 0) + 1
  json.rooms.rooms = json.rooms.rooms.map(makeRoom)
  return initialState().merge({rooms: json.rooms.rooms})
}

function finishRoomEditor(state, roomProperties) {
  return state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === state.get('selectedRoomId'))
      , room => room.merge(roomProperties)
    )
  })
}
