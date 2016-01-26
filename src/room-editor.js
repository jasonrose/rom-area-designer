import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import getters from './getters'
import actions from './actions'

class RoomEditor extends React.Component {
  constructor(props) {
    super(props)
    this.room = props.rooms.get('rooms').find(it => it.get('id') === props.selectedRoomId)
    this.state = {
      flags: this.room.get('flags').toJS()
    }
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

  changeFlag(key) {
    return function(e) {
      this.state.flags = this.state.flags || []
      const flags = this.state.flags
      const index = flags.indexOf(key)
      if(index === -1 && e.target.checked) {
        flags.push(key)
      } else if(index !== -1) {
        flags.splice(index, 1)
      }
      this.setState(this.state)
    }
  }

  render() {
    const room = this.room
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
          </form>
          <form className="form-inline cf">
            <div className="form-element">
              <label htmlFor="room-heal">Heal Rate (%)</label>
              <input id="room-heal"
                     type="number"
                     min="0"
                     max="200"
                     className="form-input"
                     onChange={this.genericCallback('heal').bind(this)}
                     defaultValue={room.get('heal')}>
              </input>
            </div>
            <div className="form-element">
              <label htmlFor="room-mana">Mana Rate (%)</label>
              <input id="room-mana"
                     type="number"
                     min="0"
                     max="200"
                     className="form-input"
                     onChange={this.genericCallback('mana').bind(this)}
                     defaultValue={room.get('mana')}>
              </input>
            </div>
          </form>
          <form>
            <div className="form-element">
              <label htmlFor="room-sector">Sector</label>
              <select defaultValue={room.get('sector')}
                      className="form-input"
                      id="room-sector"
                      onChange={this.genericCallback('sector').bind(this)}>
                {this.props.roomSectors.map(sector => <option key={sector} value={sector}>{sector}</option>)}
              </select>
            </div>
          </form>
          <form className="form-inline">
            {this.props.roomFlags.map(flag => {
              return (
                <label key={flag} className="input-checkbox form-element">
                  <input type="checkbox" defaultChecked={room.get('flags').contains(flag)} onChange={this.changeFlag(flag).bind(this)}/>
                  {flag}
                </label>
              )
            })}
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
    rooms: getters.rooms,
    roomFlags: getters.roomFlags,
    roomSectors: getters.roomSectors
  }
}

const connectedRoomEditor = connect(mapStateToProps)(RoomEditor)

export default connectedRoomEditor
