import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import getters from './getters'
import actions from './actions'

class Importer extends React.Component {
  doImport() {
    actions.finishImport(this.state.text)
  }

  textChanged(e) {
    this.setState({text: e.target.value})
  }

  doCancel() {
    actions.cancelImport()
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal modal-no-sections">
          <textarea className="form-input import-text" onChange={this.textChanged.bind(this)}>
          </textarea>
          <div className="cf">
            <a className="button pull-right" onClick={this.doImport.bind(this)}>Import</a>
            <a className="button button-outlined-neutral pull-right" onClick={this.doCancel.bind(this)}>Cancel</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(props) {
  return {
  }
}

const connectedImporter = connect(mapStateToProps)(Importer)

export default connectedImporter
