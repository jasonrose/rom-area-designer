import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters'
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
    let maxY = 0
    let minY = 0
    let maxX = 0
    let minX = 0
    const cells = []
    rooms.get('rooms').forEach((room) => {
      cells.push(this.roomToCell(room))
      const coordinates = room.get('coordinates').toJS()
      if(coordinates[0] < minX) {
        minX = coordinates[0]
      } else if(coordinates[0] > maxX) {
        maxX = coordinates[0]
      }
      if(coordinates[1] < minY) {
        minY = coordinates[0]
      } else if(coordinates[1] > maxY) {
        maxY = coordinates[1]
      }
    })
    const style = {
      minHeight: 2 * (60 * (maxY - minY + 1)) + 40,
      minWidth: 2 * (60 * (maxX - minX + 1)) + 40
    }
    return (
      <div id="map">
        <div className="cells" style={style}>
          {cells}
        </div>
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
