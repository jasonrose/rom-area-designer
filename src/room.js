import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters'
import actions from './actions'

class Room extends React.Component {
  onClick() {
    const roomId = this.props.room.get('id')
    const selectedRoomId = this.props.selectedRoomId
    if(selectedRoomId === null || selectedRoomId !== roomId) {
      actions.selectRoom(this.props.room.get('id'))
    } else {
      actions.selectRoom(null)
    }
  }

  addRoom(direction) {
    return function() {
      actions.addRoom(this.props.room.get('id'), direction)
    }
  }

  linkRoom(direction) {
    return function() {
      actions.linkRoom(this.props.room.get('id'), direction)
    }
  }

  unlinkRoom(direction) {
    return function() {
      actions.unlinkRoom(this.props.room.get('id'), direction)
    }
  }

  toggleDoor(direction) {
    return function() {
      actions.toggleDoor(this.props.room.get('id'), direction)
    }
  }

  removeRoom() {
    actions.removeRoom(this.props.room)
  }

  editRoom() {
    actions.startRoomEditor()
  }

  preventDefault(e) {
    e.stopPropagation()
  }

  createEditControl() {
    return (
      <div className="room-cell new-room edit-room" onClick={this.editRoom.bind(this)}>
        <span className="room-text">?</span>
      </div>
    )
  }

  createRemoveControl() {
    return (
      <div className="room-cell new-room remove-room" onClick={this.removeRoom.bind(this)}>
        <span className="room-text">x</span>
      </div>
    )
  }

  createRoomControl(neighborhood, direction, ordinal) {
    const classNames = classnames('room-cell', 'new-room', `room-${direction}`)
    let onClick = null
    let text = ''
    if(!neighborhood[direction]) {
      onClick = this.addRoom(ordinal).bind(this)
      text = '+'
    } else if(neighborhood[direction].type === 'unlinked') {
      onClick = this.linkRoom(ordinal).bind(this)
      text = '<->'
    } else if(neighborhood[direction].type === 'linked') {
      onClick = this.unlinkRoom(ordinal).bind(this)
      text = '</>'
    }
    return (
      <div className={classNames}>
        <span className="room-text" onClick={onClick}>{text}</span>
      </div>
    )
  }

  createDoorControl(room, direction, ordinal) {
    const classNames = ['door-cell', `door-${direction}`]
    const doors = room.get('doors').toJS()
    if(doors[ordinal] === 0) {
      return
    } else if(doors[ordinal] === 1) {
      classNames.push('door-open')
    } else if(doors[ordinal] === 2) {
      classNames.push('door-closed')
    }
    return (
      <div className={classnames(classNames)} onClick={this.toggleDoor(ordinal).bind(this)}></div>
    )
  }

  createRoomControls(room, isSelected) {
    const coordinates = room.get('coordinates').toJS()
    let roomControls = null
    if(isSelected) {
      const neighborhood = this.props.rooms.get('rooms').reduce((acc, neighbor) => {
        const coords = neighbor.get('coordinates').toJS()
        const neighborId = neighbor.get('id')
        if(coordinates[0] === coords[0] && coordinates[1] - coords[1] === 1 && coordinates[2] === coords[2]) {
          if(room.get('links').get(2) === neighborId) {
            acc.south = {type: 'linked', room: neighbor}
          } else {
            acc.south = {type: 'unlinked', room: neighbor}
          }
        } else if(coordinates[0] === coords[0] && coordinates[1] - coords[1] === -1 && coordinates[2] === coords[2]) {
          if(room.get('links').get(0) === neighborId) {
            acc.north = {type: 'linked', room: neighbor}
          } else {
            acc.north = {type: 'unlinked', room: neighbor}
          }
        } else if(coordinates[0] - coords[0] === 1 && coordinates[1] === coords[1] && coordinates[2] === coords[2]) {
          if(room.get('links').get(3) === neighborId) {
            acc.west = {type: 'linked', room: neighbor}
          } else {
            acc.west = {type: 'unlinked', room: neighbor}
          }
        } else if(coordinates[0] - coords[0] === -1 && coordinates[1] === coords[1] && coordinates[2] === coords[2]) {
          if(room.get('links').get(1) === neighborId) {
            acc.east = {type: 'linked', room: neighbor}
          } else {
            acc.east = {type: 'unlinked', room: neighbor}
          }
        } else if(coordinates[0] === coords[0] && coordinates[1] === coords[1] && coordinates[2] - coords[2] === 1) {
          if(room.get('links').get(5) === neighborId) {
            acc.down = {type: 'linked', room: neighbor}
          } else {
            acc.down = {type: 'unlinked', room: neighbor}
          }
        } else if(coordinates[0] === coords[0] && coordinates[1] === coords[1] && coordinates[2] - coords[2] === -1) {
          if(room.get('links').get(4) === neighborId) {
            acc.up = {type: 'linked', room: neighbor}
          } else {
            acc.up = {type: 'unlinked', room: neighbor}
          }
        }
        return acc
      }, {})
      roomControls = (
        <div className="room-controls">
          {this.createRoomControl(neighborhood, 'north', 0)}
          {this.createRoomControl(neighborhood, 'east', 1)}
          {this.createRoomControl(neighborhood, 'south', 2)}
          {this.createRoomControl(neighborhood, 'west', 3)}
          {this.createRoomControl(neighborhood, 'up', 4)}
          {this.createRoomControl(neighborhood, 'down', 5)}
          {room.get('id') !== 0 ? this.createRemoveControl() : null}
          {this.createEditControl()}
        </div>
      )
    }
    return (
      <div className="room-actions" onClick={this.preventDefault}>
        {roomControls}
        {this.createDoorControl(room, 'north', 0)}
        {this.createDoorControl(room, 'east', 1)}
        {this.createDoorControl(room, 'south', 2)}
        {this.createDoorControl(room, 'west', 3)}
        {this.createDoorControl(room, 'up', 4)}
        {this.createDoorControl(room, 'down', 5)}
      </div>
    )
  }

  createExit(link, index) {
    if(link === null) {
      return
    }
    const classNames = classnames('room-exit', `room-exit-${index}`)
    return (
      <div className={classNames} key={index} onClick={this.toggleDoor(index).bind(this)}></div>
    )
  }

  createExits(room) {
    const exits = room.get('links').map(this.createExit.bind(this))
    return (
      <div className="room-exits" onClick={this.preventDefault}>
        {exits}
      </div>
    )
  }

  render() {
    const { room, selectedRoomId } = this.props
    const isSelected = room.get('id') === selectedRoomId
    const classNames = classnames('room-cell', {'starting-room': room.get('id') === 0}, {selected: isSelected})
    const controls = this.createRoomControls(room, isSelected)
    const exits = this.createExits(room)
    const style = {
      marginTop: -80 * this.props.top - 20,
      marginLeft: 80 * this.props.left - 20,
    }
    return (
      <div className={classNames}
           style={style}
           onClick={this.onClick.bind(this)}
           id={`room-${room.get('id')}`}>
        <span className="room-text">{room.get('id')}</span>
        {controls}
        {exits}
      </div>
    )
  }
}

function roomStateToProps(props) {
  return {
    selectedRoomId: getters.selectedRoomId,
    rooms: getters.rooms
  }
}

const connectedRoom = connect(roomStateToProps)(Room)

export default connectedRoom
