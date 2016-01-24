import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters'
import actions from './actions'

class RoomsToolbar extends React.Component {
  selectRow(roomId) {
    if(roomId === this.props.selectedRoomId) {
      actions.selectRoom(null)
    } else {
      actions.selectRoom(roomId)
    }
  }

  toRow(entry, idx) {
    const rowClassNames = classnames({selected: this.props.selectedRoomId === entry.get('id')})
    return (
      <tr key={idx} className={rowClassNames} onClick={this.selectRow.bind(this, entry.get('id'))}>
        <td>
          {idx}
        </td>
        <td>
          {entry.get('name')}
        </td>
      </tr>
    )
  }

  render() {
    const { rooms } = this.props
    const rows = rooms.get('rooms').map(this.toRow.bind(this))
    return (
      <table className="rooms-toolbar-table">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(props) {
  return {
    rooms: getters.rooms,
    selectedRoomId: getters.selectedRoomId
  }
}

const connectedRoomsToolbar = connect(mapStateToProps)(RoomsToolbar)

export default connectedRoomsToolbar
