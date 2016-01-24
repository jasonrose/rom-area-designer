import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters.js'
import Room from './room'

class Map extends React.Component {
  roomToCell(room, top, left) {
    return (
      <Room room={room} key={room.get('id')} top={top} left={left}></Room>
    )
  }

  breadthFirstSearch(root, t, l) {
    const found = {}
    const cells = []
    const queue = [[root, t, l]]
    while(queue.length > 0) {
      const [room, top, left] = queue.pop()
      if(found[room.get('id')]) {
        continue
      }
      found[room.get('id')] = true
      cells.push(this.roomToCell(room, top, left))
      const links = room.get('links').toJS()
      const roomFinder = link => this.props.rooms.get('rooms').find(it => it.get('id') === link)
      const tuples = [[0, top - 1, left], [1, top, left + 1], [2, top + 1, left], [3, top, left - 1]]
      for(const tuple of tuples) {
        const roomId = links[tuple[0]]
        if(roomId !== null) {
          queue.push([roomFinder(roomId), tuple[1], tuple[2]])
        }
      }
    }
    return cells
  }

  render() {
    const { rooms } = this.props
    const origin = rooms.get('rooms').get(0)
    const cells = this.breadthFirstSearch(origin, 0, 0)
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
