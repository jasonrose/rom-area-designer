import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import getters from './getters.js'

class AreaToolbar extends React.Component {
  render() {
    const { area } = this.props
    return (
      <form>
        <fieldset>
          <legend>Area Information</legend>
          <div className="form-element">
            <label htmlFor="area-name">Area Name</label>
            <input id="area-name" type="text" className="form-input"></input>
          </div>
          <div className="form-element">
            <label htmlFor="min-level">Minimum Level</label>
            <input id="min-level" type="number" min="1" max="101" className="form-input" defaultValue={ area.get('minimumLevel') }></input>
          </div>
          <div className="form-element">
            <label htmlFor="max-level">Maximum Level</label>
            <input id="max-level" type="number" min="1" max="101" className="form-input" defaultValue={ area.get('maximumLevel') }></input>
          </div>
          <div className="form-element">
            <label htmlFor="author-name">Author Name</label>
            <input id="author-name" type="text" className="form-input"></input>
          </div>
        </fieldset>
      </form>
    )
  }
}

function mapStateToProps(props) {
  return {
    area: getters.area
  }
}

const connectedAreaToolbar = connect(mapStateToProps)(AreaToolbar)

export default connectedAreaToolbar

