import React from 'react'
import { connect } from 'nuclear-js-react-addons'
import getters from './getters'

class MobsToolbar extends React.Component {
  toRow(entry, idx) {
    return (
      <tr>
        <td>
          {idx}
        </td>
        <td>
          {entry.get('shortDescription')}
        </td>
      </tr>
    )
  }

  render() {
    const { mobs } = this.props
    const rows = mobs.get('mobs').map(this.toRow)
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Short</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(props) {
  return {
    mobs: getters.mobs
  }
}

const connectedMobsToolbar = connect(mapStateToProps)(MobsToolbar)

export default connectedMobsToolbar

