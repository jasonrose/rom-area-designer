import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import getters from './getters'
import actions from './actions'

class RoomEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  doApply() {
    actions.finishRoomEditor(this.state)
  }

  doCancel() {
    actions.cancelRoomEditor()
  }

  genericCallback(key) {
    return function(e) {
      this.state[key] = e.target.value.trim()
      this.setState(this.state)
    }
  }

  render() {
    const { rooms, selectedRoomId } = this.props
    const room = rooms.get('rooms').find(it => it.get('id') === selectedRoomId)
    return (
      <div className="overlay">
        <div className="modal modal-no-sections">
          <h3>Editing room {this.props.selectedRoomId}</h3>
          <form>
            <div className="form-element">
              <label htmlFor="room-name">Room Name</label>
              <input id="room-name"
                     type="text"
                     className="form-input"
                     onChange={this.genericCallback('name').bind(this)}
                     defaultValue={room.get('name')}>
              </input>
            </div>
            <div className="form-element">
              <label htmlFor="room-description">Room Description</label>
              <textarea id="room-description"
                        className="form-input room-description"
                        onChange={this.genericCallback('description').bind(this)}
                        defaultValue={room.get('description')}>
              </textarea>
            </div>
            <div className="cf">
              <button type="button" className="button pull-right" onClick={this.doApply.bind(this)}>Apply</button>
              <button type="button" className="button button-outlined-neutral pull-right" onClick={this.doCancel.bind(this)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(props) {
  return {
    selectedRoomId: getters.selectedRoomId,
    rooms: getters.rooms
  }
}

const connectedRoomEditor = connect(mapStateToProps)(RoomEditor)

export default connectedRoomEditor
