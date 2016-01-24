import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters.js'
import AreaToolbar from './area-toolbar'
import MobsToolbar from './mobs-toolbar'
import RoomsToolbar from './rooms-toolbar'
import ToolbarTab from './toolbar-tab'

class Toolbar extends React.Component {
  getActiveToolbarBody(selectedToolbarTab) {
    switch(selectedToolbarTab) {
      case 'area-tab': return <AreaToolbar />
      case 'mobs-tab': return <MobsToolbar />
      case 'rooms-tab': return <RoomsToolbar />
    }
  }

  render() {
    const toolbarBody = this.getActiveToolbarBody(this.props.uiState.get('selectedToolbarTab'))
    return (
      <div id="toolbar">
        <nav role="navigation">
          <ul className="list-unstyled list-inline tabs">
            <ToolbarTab id="area-tab" text="Area" />
            <ToolbarTab id="rooms-tab" text="Rooms" />
            <ToolbarTab id="mobs-tab" text="Mobs" />
          </ul>
        </nav>
        {toolbarBody}
      </div>
    )
  }
}

function mapStateToProps(props) {
  return {
    uiState: getters.uiState
  }
}

const connectedToolbar = connect(mapStateToProps)(Toolbar)

export default connectedToolbar
