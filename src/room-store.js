import { Store, toImmutable } from 'nuclear-js'
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

export default Store({
  getInitialState() {
    return toImmutable({
      rooms: [
        {id: 0, name: 'Your starting room', links: [null, null, null, null, null, null], coordinates: [0, 0, 0]}
      ],
      selectedRoomId: null
    })
  },

  initialize() {
    this.on(actionTypes.ROOM_SELECTED, selectRoom)
    this.on(actionTypes.ADD_ROOM, addRoom)
    this.on(actionTypes.LINK_ROOM, linkRoom)
    this.on(actionTypes.UNLINK_ROOM, unlinkRoom)
  }
})

function selectRoom(state, roomId) {
  return state.set('selectedRoomId', roomId)
}

function addRoom(state, {roomId, direction}) {
  const newRoom = {id: roomIdCounter++, name: 'New room', links: [null, null, null, null, null, null]}
  newRoom.links[roomDirectionMap[direction]] = roomId
  newRoom.coordinates = directionToCoordinates(state.get('rooms').find(room => room.get('id') === roomId).get('coordinates'), direction)
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
      , room => room.update('links', links => links.set(direction, null))
    )
  })
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === targetRoom.get('id'))
      , room => room.update('links', links => links.set(roomDirectionMap[direction], null))
    )
  })
  return state
}
