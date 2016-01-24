import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters'
import actions from './actions.js'

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

  addRoomNorth() {
    actions.addRoom(this.props.room.get('id'), 0)
  }

  addRoomEast() {
    actions.addRoom(this.props.room.get('id'), 1)
  }

  addRoomSouth() {
    actions.addRoom(this.props.room.get('id'), 2)
  }

  addRoomWest() {
    actions.addRoom(this.props.room.get('id'), 3)
  }

  linkRoomNorth() {
    actions.linkRoom(this.props.room.get('id'), 0)
  }

  linkRoomEast() {
    actions.linkRoom(this.props.room.get('id'), 1)
  }

  linkRoomSouth() {
    actions.linkRoom(this.props.room.get('id'), 2)
  }

  linkRoomWest() {
    actions.linkRoom(this.props.room.get('id'), 3)
  }

  unlinkRoomNorth() {
    actions.unlinkRoom(this.props.room.get('id'), 0)
  }

  unlinkRoomEast() {
    actions.unlinkRoom(this.props.room.get('id'), 1)
  }

  unlinkRoomSouth() {
    actions.unlinkRoom(this.props.room.get('id'), 2)
  }

  unlinkRoomWest() {
    actions.unlinkRoom(this.props.room.get('id'), 3)
  }

  preventDefault(e) {
    e.stopPropagation()
  }

  createRoomControl(neighborhood, direction) {
    const uppercaseDirection = `${direction.substring(0, 1).toUpperCase()}${direction.substring(1)}`
    const classNames = classnames('room-cell', 'new-room', `room-${direction}`)
    let onClick = null
    let text = ''
    if(!neighborhood[direction]) {
      onClick = this[`addRoom${uppercaseDirection}`].bind(this)
      text = '+'
    } else if(neighborhood[direction].type === 'unlinked') {
      onClick = this[`linkRoom${uppercaseDirection}`].bind(this)
      text = '<->'
    } else if(neighborhood[direction].type === 'linked') {
      onClick = this[`unlinkRoom${uppercaseDirection}`].bind(this)
      text = '</>'
    }
    return (
      <div className={classNames}>
        <span className="room-text" onClick={onClick}>{text}</span>
      </div>
    )
  }

  createRoomControls(room) {
    const coordinates = room.get('coordinates').toJS()
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
    return (
      <div className="room-actions" onClick={this.preventDefault}>
        {this.createRoomControl(neighborhood, 'north')}
        {this.createRoomControl(neighborhood, 'east')}
        {this.createRoomControl(neighborhood, 'south')}
        {this.createRoomControl(neighborhood, 'west')}
      </div>
    )
  }

  createExit(room, link, index) {
    if(!link) {
      return
    }
    const classNames = classnames('room-exit', `room-exit-${index}`)
    return (
      <div className={classNames} key={index}></div>
    )
  }

  createExits(room) {
    const exits = room.get('links').map((link, index) => this.createExit(room, link, index))
    return (
      <div className="room-actions" onClick={this.preventDefault}>
        {exits}
      </div>
    )
  }

  render() {
    const { room, selectedRoomId } = this.props
    const isSelected = room.get('id') === selectedRoomId
    const classNames = classnames('room-cell', {'starting-room': room.get('id') === 0}, {selected: isSelected})
    const controls = isSelected ? this.createRoomControls(room) : null
    const exits = this.createExits(room)
    const style = {
      marginTop: -60 * this.props.top,
      marginLeft: 60 * this.props.left,
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
