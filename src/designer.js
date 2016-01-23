import React from 'react'
import { connect } from 'nuclear-js-react-addons'

import Toolbar from './toolbar'

class Designer extends React.Component {
  render() {
    return (
      <div className="main">
        <Toolbar />
        <div id="map">Map</div>
      </div>
    )
  }
}

function mapStateToProps(props) {
  return {}
}

const connectedDesigner = connect(mapStateToProps)(Designer)

export default connectedDesigner
