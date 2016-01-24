import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './action-types'

export default Store({
  getInitialState() {
    return toImmutable({
      mobs: []
    })
  }
})

