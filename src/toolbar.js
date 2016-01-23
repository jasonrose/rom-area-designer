import React from 'react'

import AreaToolbar from './area-toolbar'

class Toolbar extends React.Component {
  render() {
    return (
      <div id="toolbar">
        <nav role="navigation">
          <ul className="list-unstyled list-inline tabs">
            <li><a className="current-item">Area</a></li>
            <li><a>Rooms</a></li>
            <li><a>Mobs</a></li>
          </ul>
        </nav>
        <AreaToolbar />
      </div>
    )
  }
}

export default Toolbar
