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

export default Store({
  getInitialState() {
    return toImmutable({
      rooms: [
        {id: 0, name: 'Your starting room', links: [null, null, null, null, null, null]}
      ],
      selectedRoomId: null
    })
  },

  initialize() {
    this.on(actionTypes.ROOM_SELECTED, selectRoom)
    this.on(actionTypes.ADD_ROOM, addRoom)
  }
})

function selectRoom(state, roomId) {
  return state.set('selectedRoomId', roomId)
}

function addRoom(state, {roomId, direction}) {
  const newRoom = {id: roomIdCounter++, name: 'New room', links: [null, null, null, null, null, null]}
  newRoom.links[roomDirectionMap[direction]] = roomId
  state = state.updateIn(['rooms'], rooms => {
    return rooms.update(
      rooms.findIndex(room => room.get('id') === roomId)
    , room => room.update('links', links => links.set(direction, newRoom.id))
    )
  })
  return state.update('rooms', rooms => rooms.push(toImmutable(newRoom)))
}
