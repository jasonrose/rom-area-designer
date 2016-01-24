import React from 'react'
import { connect } from 'nuclear-js-react-addons'

import Toolbar from './toolbar'
import Map from './map'

class Designer extends React.Component {
  render() {
    return (
      <div className="main">
        <Toolbar />
        <Map />
      </div>
    )
  }
}

function mapStateToProps(props) {
  return {}
}

const connectedDesigner = connect(mapStateToProps)(Designer)

export default connectedDesigner
