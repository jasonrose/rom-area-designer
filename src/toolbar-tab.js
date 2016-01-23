import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import classnames from 'classnames'
import getters from './getters.js'
import actions from './actions.js'

class ToolbarTab extends React.Component {
  handleClick(e) {
    actions.selectToolbarTab(e.target.id)
  }

  render() {
    const classNames = classnames({'current-item': this.props.uiState.get('selectedToolbarTab') === this.props.id})
    return (
      <li>
        <a id={this.props.id} className={classNames} onClick={this.handleClick}>{this.props.text}</a>
      </li>
    )
  }
}

function mapStateToProps(props) {
  return {
    uiState: getters.uiState
  }
}

const connectedToolbarTab = connect(mapStateToProps)(ToolbarTab)

export default connectedToolbarTab
