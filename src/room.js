import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters.js'
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

  preventDefault(e) {
    e.stopPropagation()
  }

  createRoomControls(room) {
    return (
      <div className="room-actions" onClick={this.preventDefault}>
        <div className="room-cell new-room room-north">
          <span className="room-text" onClick={this.addRoomNorth.bind(this)}>+</span>
        </div>
        <div className="room-cell new-room room-east">
          <span className="room-text" onClick={this.addRoomEast.bind(this)}>+</span>
        </div>
        <div className="room-cell new-room room-south">
          <span className="room-text" onClick={this.addRoomSouth.bind(this)}>+</span>
        </div>
        <div className="room-cell new-room room-west">
          <span className="room-text" onClick={this.addRoomWest.bind(this)}>+</span>
        </div>
      </div>
    )
  }

  render() {
    const { room, selectedRoomId } = this.props
    const isSelected = room.get('id') === selectedRoomId
    const classNames = classnames('room-cell', {'starting-room': room.get('id') === 0}, {selected: isSelected})
    const controls = isSelected ? this.createRoomControls(room) : null
    const style = {
      marginTop: 60 * this.props.top,
      marginLeft: 60 * this.props.left,
    }
    return (
      <div className={classNames}
           style={style}
           onClick={this.onClick.bind(this)}>
        <span className="room-text">{room.get('id')}</span>
        {controls}
      </div>
    )
  }
}

function roomStateToProps(props) {
  return {
    selectedRoomId: getters.selectedRoomId
  }
}

const connectedRoom = connect(roomStateToProps)(Room)

export default connectedRoom
