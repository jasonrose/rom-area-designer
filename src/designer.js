import React from 'react'

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

export default Designer
