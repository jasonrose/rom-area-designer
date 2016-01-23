require('./styles.styl')

import React from 'react'
import { render } from 'react-dom'
import { Provider, connect, nuclearMixin} from 'nuclear-js-react-addons'

import Designer from './designer'

import reactor from './reactor'
import AreaStore from './area-store'
import UiStateStore from './ui-state-store'

reactor.registerStores({
  area: AreaStore,
  uiState: UiStateStore
})

render((
    <Provider reactor={reactor}>
      <Designer />
    </Provider>
  )
  , document.getElementById('root'))
