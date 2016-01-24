import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import getters from './getters.js'

class RoomsToolbar extends React.Component {
  toRow(entry, idx) {
    return (
      <tr key={idx}>
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
    const rows = rooms.get('rooms').map(this.toRow)
    return (
      <table>
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
    rooms: getters.rooms
  }
}

const connectedRoomsToolbar = connect(mapStateToProps)(RoomsToolbar)

export default connectedRoomsToolbar

