import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters.js'
import Room from './room'

class Map extends React.Component {
  roomToCell(room) {
    const coords = room.get('coordinates')
    return (
      <Room room={room} key={room.get('id')} top={coords.get(1)} left={coords.get(0)}></Room>
    )
  }

  render() {
    const { rooms } = this.props
    const cells = rooms.get('rooms').map(this.roomToCell)
    const style = {
      minHeight: 40 * 2 * rooms.size,
      minWidth: 40 * 2 * rooms.size
    }
    return (
      <div id="map" style={style}>
        {cells}
      </div>
    )
  }
}

function mapStateToProps(props) {
  return {
    rooms: getters.rooms
  }
}

const connectedMap = connect(mapStateToProps)(Map)

export default connectedMap
