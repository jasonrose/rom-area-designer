import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import actions from './actions'
import getters from './getters'

class Floors extends React.Component {

  up() {
    actions.selectFloor(this.props.floor + 1)
  }

  down() {
    actions.selectFloor(this.props.floor - 1)
  }

  render() {
    const { floor } = this.props
    return (
      <div className="floors">
        <span>Currently on level {floor}</span>
        <a className="button" onClick={this.up.bind(this)}>⇧</a>
        <a className="button flip" onClick={this.down.bind(this)}>⇧</a>
      </div>
    )
  }
}

function mapStateToProps(props) {
  return {
    floor: getters.floor
  }
}

const connectedFloors = connect(mapStateToProps)(Floors)

export default connectedFloors
