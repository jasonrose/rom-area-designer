import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import getters from './getters'
import Toolbar from './toolbar'
import Map from './map'
import Importer from './importer'

class Designer extends React.Component {
  render() {
    if(this.props.isImporting) {
      return (
        <Importer />
      )
    } else {
      return (
        <div className="main">
          <Toolbar />
          <Map />
        </div>
      )
    }
  }
}

function mapStateToProps(props) {
  return {
    isExporting: getters.isExporting,
    isImporting: getters.isImporting
  }
}

const connectedDesigner = connect(mapStateToProps)(Designer)

export default connectedDesigner
